import * as cdk from 'aws-cdk-lib';
import * as cfn from 'aws-cdk-lib/aws-cloudformation';
import { Construct } from 'constructs';

export interface props extends cdk.StackProps {
  stackSetsName: string;
  regions: string[];
  accounts?: string[];
  organizationalUnitIds?: string[];
  templateBody: string;
}

export class StackSets extends cdk.Stack {
  constructor(scope: Construct, id: string, props: props) {
    super(scope, id, props);

    new cfn.CfnStackSet(this, 'Stackset', {
      permissionModel: props.accounts !== undefined ? 'SELF_MANAGED' : 'SERVICE_MANAGED',
      stackSetName: `${props.stackSetsName}`,
      autoDeployment:
        props.accounts !== undefined
          ? undefined
          : {
              enabled: true,
              retainStacksOnAccountRemoval: false,
            },
      capabilities: ['CAPABILITY_NAMED_IAM'],
      stackInstancesGroup: [
        {
          regions: props.regions,
          deploymentTargets:
            props.accounts !== undefined ? { accounts: props.accounts } : { organizationalUnitIds: props.organizationalUnitIds },
        },
      ],
      templateBody: props.templateBody,
    });
  }
}
