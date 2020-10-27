const toThousands = function (num) {
    var decimalPart = '';
    if (num != null) {
        num = num.toString();
        if (num.indexOf('.') != -1) {
            decimalPart = '.' + num.split('.')[1];
            num = parseInt(num.split('.')[0]);
        }
        var array = num.toString().split('');
        var index = -3;
        while (array.length + index > 0) {
            array.splice(index, 0, ',');
            index -= 4;
        }
        return array.join('') + decimalPart;
    }

}
export default toThousands