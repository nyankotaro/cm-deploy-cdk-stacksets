#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { StackSets } from '../lib/stacksets';
import { CloudtrailStack } from '../lib/template/cloudtrail-stack';
import { VpcStack } from '../lib/template/vpc-stack';

const app = new cdk.App();
const stage = new cdk.Stage(app, 'template');
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new CloudtrailStack(stage, '01-CloudTrailStack', {
  synthesizer: new cdk.DefaultStackSynthesizer({ generateBootstrapVersionRule: false }),
});
new VpcStack(stage, '02-VpcStack', {
  synthesizer: new cdk.DefaultStackSynthesizer({ generateBootstrapVersionRule: false }),
});

const template1 = stage.synth().stacks[0].template;
new StackSets(app, 'CloudTrailStackSet', {
  stackSetsName: 'cloudtrail-stack',
  env: env,
  organizationalUnitIds: ['ou-omcc-xxxxxxxx'],
  regions: ['ap-northeast-1'],
  templateBody: JSON.stringify(template1),
});

const template2 = stage.synth().stacks[1].template;
new StackSets(app, 'VpcStackSet', {
  stackSetsName: 'vpc-stack',
  env: env,
  organizationalUnitIds: ['ou-omcc-xxxxxxxx'],
  regions: ['ap-northeast-1'],
  templateBody: JSON.stringify(template2),
});
