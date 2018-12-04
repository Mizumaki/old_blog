# tslint
reactとreact-router周りで起こったエラーまとめ

## `value must be set for boolean attributes`
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21293#h5o-12

boolean型のプロパティは明示する。

```tsx
// before
<Route exact path="/">
    <p>top</p>
</Route>

// after
<Route exact={true} path="/">
    <p>top</p>
</Route>
```

## `Lambdas are forbidden in JSX attributes due to their rendering performance impact`
https://github.com/wmonk/create-react-app-typescript/issues/370

詳しく調べていないが、[コンポーネントのrender内でさらに関数を呼ぶと必要以上にre-renderされてしまうからやめてね](https://github.com/wmonk/create-react-app-typescript/issues/370#h5o-10)ってこと、と理解した。

そのため、`<Route>`で表示したものを囲む形式に変更。

```tsx
// before
<Route exact={true} render={() => 
  <p>top</p>
} />

// after
<Route exact={true} path="/">
    <p>top</p>
</Route>
```