### .mui-plus

### range滑动颜色样式修改

```
.mui-input-range input[type=range]::-webkit-slider-thumb {
    background-color: #f00;
}
```

### .mui-plus-visible .mui-plus-hidden
我们可以使用`.mui-plus-visible`将只能在5+环境下正常使用的内容在web环境下隐藏，
反过来我们可以使用 `.mui-plus-hidden`将在web中正常显示的内容在5+环境下隐藏。
```
<div class="mui-input-row mui-plus-visible">
	<label>mui-plus-visible</label>
	<input type="text" class="mui-input-speech mui-input-clear" placeholder="我在web环境下隐藏5+环境下显示">
</div>
<div class="mui-input-row mui-plus-hidden">
	<label>mui-plus-hidden</label>
	<input type="text" class="mui-input-clear" placeholder="我在web环境下显示5+环境下隐藏">
</div>
```