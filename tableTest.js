(function () {
    var parent = document.getElementsByClassName('custom-table')[0].getElementsByTagName('ul')[0];
    var elements = document.getElementsByClassName('fixed-action');

    var rightOffset = document.getElementsByClassName('custom-table')[0].clientWidth - elements[elements.length -1].clientWidth;
    var leftOffset = elements[0].clientWidth;
    var columns = [];

    var headers = parent.getElementsByClassName('custom-table-header')[0].getElementsByTagName('div');

    init();

    // bind event handlers
    document.getElementsByClassName('counter-left')[0].addEventListener('click', function(){showAll('left');});
    document.getElementsByClassName('counter-right')[0].addEventListener('click', function(){showAll('right');});
    parent.addEventListener("scroll", function() {
        scrollFixedColumns();
        countElementsHidden();
    });


    // functions
    function init(){
        // i = 1 -> first col always fixed
        // length - 1 -> last col always fixed
        for(var j = 1; j < headers.length - 1 ; j++){
            columns.push([headers[j].offsetLeft, headers[j].offsetLeft + headers[j].clientWidth]);
        }

        countElementsHidden();
        initCounter('left', leftOffset - 17);
        initCounter('right', rightOffset - 17);

        for(var i = 0; i < elements.length; i++){
            elements[i].style.left = rightOffset + 'px';
            elements[i].style.position = 'fixed';
            elements[i].style.zIndex = columns.length + 1;
        }
    }

    function scrollFixedColumns(){

    }

    function countElementsHidden(){
        var leftCounter = 0;
        var rightCounter = 0;

        for(var i = 0; i < columns.length; i++){
            if((columns[i][1] - elements[0].clientWidth) < parent.scrollLeft + 2){
                leftCounter++;
                if(!document.getElementById('virtual-left-' + i)){
                    setStack('left', leftOffset + 2 * i, i, columns.length - i);
                }
            } else {
                if(document.getElementById('virtual-left-' + i)){
                    document.getElementById('virtual-left-' + i).remove();
                }
            }

            if(columns[i][0] - parent.scrollLeft > (parent.clientWidth - elements[0].clientWidth)){
                rightCounter++;
                if(document.getElementById('virtual-right-' + i) === null){
                    console.log(2 * (columns.length - i));
                    setStack('right', rightOffset - 1 - (2 * (columns.length - i)), i, i);
                }
            } else {
                if(document.getElementById('virtual-right-' + i) !== null){
                    document.getElementById('virtual-right-' + i).remove();
                }
            }
        }
        setCounter('left', leftCounter);
        setCounter('right', rightCounter);
    }

    function setStack(direction, left, columnIndex, zIndex){
        var virtualDiv = document.createElement('div');
        virtualDiv.setAttribute('id', 'virtual-' + direction + '-' + columnIndex);
        virtualDiv.setAttribute('class', 'virtualDiv virtual-' + direction);
        virtualDiv.style.zIndex = zIndex;
        virtualDiv.style.left = left + 'px';
        document.getElementsByClassName('custom-table')[0].appendChild(virtualDiv);
    }

    function setCounter(position, value){
        document.getElementsByClassName('counter-' + position)[0].innerHTML = value;
        document.getElementsByClassName('counter-' + position)[0].style.zIndex = columns.length + 2;
    }

    function initCounter(position, left){
        var counter = document.getElementsByClassName('counter-' + position)[0];
        counter.style.top = (elements[0].clientHeight - 17)+ 'px';
        counter.style.left = left + 'px';
    }

    function showAll(direction){
        if(direction === 'left'){
            parent.scrollLeft = 0;
        } else {
            parent.scrollLeft = parent.clientWidth;
        }
    }
})();