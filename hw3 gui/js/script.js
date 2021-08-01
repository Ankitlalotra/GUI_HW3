function appendReplaceHtmlElement(newHtmlElement, parentNode) {
    var oldHtmlElement;
    if ((oldHtmlElement = document.getElementById(newHtmlElement.id)) &&
        oldHtmlElement.parentNode === parentNode) {
        parentNode.replaceChild(newHtmlElement, oldHtmlElement); // REPLACING ELEMENTS
    } else {
        parentNode.appendChild(newHtmlElement);
    }
}

if (typeof FormHandler == "undefined") { //error message 
    var FormHandler = (function() {
        var form;
        var minError = 'Min value must be less then or equal to maximum value.';
        var maxError = 'Max value must be greater then or equal to minimum value.';


        /**
         Calls createMultTable(), appendReplaceHtmlElement(), and 
         * FormHandler.validation(). */
        var init = function() {
            form = document.getElementById('form');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var table = createMultTable(
                    form.elements['multiplierMin'].value,
                    form.elements['multiplierMax'].value,
                    form.elements['multiplicandMin'].value,
                    form.elements['multiplicandMax'].value);
                appendReplaceHtmlElement(table, form);
            });

            for (var i = 0; i < form.elements.length; i++) {
                if (form.elements[i].type !== 'number') continue;

                // Add listener
                form.elements[i].addEventListener('input', validation);
            }
        }

        /* checks for user data if entered wrong error
         */
        var validation = function() {
            var min, max;

            if (this.name === 'multiplierMin' ||
                this.name === 'multiplierMax') {

                min = form.elements['multiplierMin'];
                max = form.elements['multiplierMax'];

            } else if (this.name === 'multiplicandMin' ||
                this.name === 'multiplicandMax') {

                min = form.elements['multiplicandMin'];
                max = form.elements['multiplicandMax'];
            }
            if (min.length !== 0 && max.length !== 0 &&
                parseInt(min.value, 10) > parseInt(max.value, 10)) {
                min.setCustomValidity(minError);
                max.setCustomValidity(maxError);
            } else {
                min.setCustomValidity('');
                max.setCustomValidity('');
            }
        }

        return {
            init: init // INIT PUBLIC
        };
    })();

    document.addEventListener('DOMContentLoaded', FormHandler.init);
};

function createMultTable(MinimumValueMultiplier, MaximumValueMultiplier) {
    var table = document.createElement('table');
    table.id = 'table';
    var firstRow = true;
    var firstCol = true;

    for (var row = MinimumValueMultiplier - 1; row <= MaximumValueMultiplier; row++) { //makes the rows!
        var tableRow = document.createElement('tr');

        for (var col = MinimumValueMultiplier - 1; col <= MaximumValueMultiplier; col++) {
            var cell;
            var cellText;
            if (firstRow) {
                cell = document.createElement('th');
                if (!firstCol) {

                    // first row wont be the first colom 
                    cellText = document.createTextNode(col);
                    cell.appendChild(cellText);
                }
            } else {
                if (firstCol) {

                    cell = document.createElement('th');
                    cellText = document.createTextNode(row);
                    cell.appendChild(cellText);

                } else {

                    // put multiplier * multiplicand in a <td>.
                    cell = document.createElement('td');
                    cellText = document.createTextNode(row * col);
                    cell.appendChild(cellText);
                }
            }
            tableRow.appendChild(cell);
            firstCol = false; // add cells
        }
        table.appendChild(tableRow); // add rows
        firstRow = false;
        firstCol = true;
    }
    return table;
}