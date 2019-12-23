# CSS 知识点

##  1、单行文本溢出省略号

<!-- 单行 -->
.one_line{
    overflow: hidden;
    text-verflow: ellipse;
    whiht-space: no-wrap;
}


<!-- 多行 -->
.muti_line{
    display: webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}





