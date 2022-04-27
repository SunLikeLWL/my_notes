var generate = function (numRows) {
 
    let a = []
    for (let i = 0; i < numRows; i++) {
        let b = []
        if (i === 0) {
            b = [1]
            a.push(b)
        } else {
            for (let j = 0; j <= i; j++) {
                if (a[i - 1] && a[i - 1][j] && a[i - 1][j - 1]) {
                    b.push(a[i - 1][j - 1] + a[i - 1][j])
                } else {
                    b.push(1)
                }
            }
            a.push(b)

        }
    }
    return a
}

console.log(generate(4))
