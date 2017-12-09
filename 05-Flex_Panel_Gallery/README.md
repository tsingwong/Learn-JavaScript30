### 主要任务

- 布局
- 动画

### 思路

- 布局使用 flex 布局
    - 这里需要使用 `flex-direction` 设置弹性布局的主轴方向
    - `justify-content`：设置在 flex 容器上，定义 Flex 项目在 Main-Axis 上的对齐方式
    - `align-items`：设置在 flex 容器上，定义 Flex 项目在  Cross-Axis 上的对齐方式
- 监听每个块的 `click` 事件，点击时触发添加类名
- 另外还需要监听 `transitionend` 事件，当上面的变化结束后添加类名，但是因为有多个属性的变化，可能有多个 `transitionend` ，所以需要 `event.propertyName` 的值
- 在测试过程中，发现两次快速点击会导致触发两次 `click` 事件，但是只会触发一次 `transitionend` 事件。所以这时候我又加了个 `dblclick` 事件，触发时改变 `flag` 值。
