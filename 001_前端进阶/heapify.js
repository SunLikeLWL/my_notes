

// 小顶堆叶子节点排序
const heapify = (arr, i, length) => {
    const left = 2 * i + 1;// 左孩子节点
    const right = 2 * i + 2;// 右孩子节点
    let mininum = i;// 假设最小的节点为父节点

    // 确认三个节点的最小节点

    if (left < length && arr[left] < arr[mininum]) {
        mininum = left;
    }

    if (right < length && arr[right] < arr[mininum]) {
        mininum = right;
    }

    // 如果父节点不是最小节点

    if (mininum !== i) {
        // 最小节点和父节点交换
        const tmp = arr[mininum];
        arr[mininum] = arr[i];
        arr[i] = tmp;
        // 对调整的节点做同样交换
        heapify(arr, mininum, length);
    }
}

//  构建小顶堆
const buildMinheap = (arr) =>{
    for(let i=Math.floor(arr.length/2);i>=0;i--){
        heapify(arr,i,arr.length);
    }
    return arr;
}

// 查找前K最大的元素

const findKMax = (arr,k) => {
    // 取数组的前k位构建小顶堆
    const newArr = [...arr];
    const kMax  = arr.slice(0,k);

    buildMinheap(kMax);

    for(let i=k;i<newArr.length;i++){
        if(newArr[i]>kMax[0]){
            const tmp = kMax[0];
            kMax[0] = newArr[i];
            newArr[i] = tmp;
            buildMinheap(kMax);
        }
    }

    return kMax;
}


