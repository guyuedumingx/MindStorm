## flex布局  
### display: flex;  
### 常见父项属性  
- ##### flex-direction 设置主轴方向  
    - row X轴（默认值）  
    - column Y轴  
    - row-reverse 反向X轴  
    - column-reverse 反向X轴  
- ##### flex-wrap 是否换行  
    - nowrap 不换行（默认值）
    - rap 换行
- ##### justify-content 设置子元素在主轴上排列方式  
    - flex-start 从头部开始（默认值）  
    - flex-end 从尾部开始  
    - center 居中  
    - space-around 平分剩余空间  
    - space-between 先平分两边再平分剩余空间
- ##### align-items 设置子元素在侧轴上排列方式（单行）  
    - flex-start 从上到下（默认值）  
    - flex-end 从下到上  
    - center 垂直居中  
    - stretch 拉伸  
- ##### align-content 设置子元素在侧轴上排列方式（多行）  
    - flex-start 从侧轴头部开始  
    - flex-end 从侧轴尾部开始  
    - center 居中  
    - space-around 平分剩余空间  
    - space-between 先平分两边再平分剩余空间  
    - stretch 子元素高度平分父元素高度  
- ##### flex-flow 设置主轴方向和是否换行（合写）  
### 常见子项属性
- ##### flex 定义是否占用剩余空间，flex表示占的份数  
- ##### align-self 设置子元素自己在侧轴上的排列方式  
- ##### order 定义子元素的排列顺序（默认是0）  
