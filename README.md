# CloudFormation StackSets

## npm install

```bash
npm install
```

## StackSets設定

適宜StackSetsの設定を行う。

```typescript
const template1 = stage.synth().stacks[0].template;
new StackSets(app, 'CloudTrailStackSet', {
  stackSetsName: 'cloudtrail-stack',
  env: env,
  organizationalUnitIds: ['ou-omcc-xxxxxxxx'],
  regions: ['ap-northeast-1'],
  templateBody: JSON.stringify(template1),
});
```

[bin/stacksets.ts](bin/stacksets.ts)

## デプロイ

```bash
npx cdk deploy --all
```

## ブログリンク

https://dev.classmethod.jp/articles/deploy-cdk-stacksets/
