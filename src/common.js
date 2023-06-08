export default {
     getClass: function(sannsynlighet, konsekvens) {
        if (sannsynlighet === 5) {
            if (konsekvens < 3) {
                return "yellow"
            }
            return "red";
        }

        if (sannsynlighet === 4) {
            if (konsekvens === 1) {
                return "green"
            } else if (konsekvens < 4) {
                return "yellow"
            } else {
                return "red";
            }
        }

        if (sannsynlighet === 3) {
            if (konsekvens < 3) {
                return "green"
            } else if (konsekvens === 3) {
                return "yellow"
            } else {
                return "red";
            }
        }

        if (sannsynlighet === 2) {
            if (konsekvens < 3) {
                return "green"
            } else if (konsekvens < 5) {
                return "yellow"
            } else {
                return "red"
            }
        }

        if (sannsynlighet === 1) {
            if (konsekvens < 3) {
                return "green"
            } else {
                return "yellow"
            }
        }

        return "green"
    },

    copyTable : function (classId) {
        // Get the HTML table element
        var table = document.getElementById(classId);

        // Create a Range object
        var range = document.createRange();

        // Select the table content
        range.selectNode(table);

        // set td style border to 1px solid black
        var tds = table.getElementsByTagName('td');
        for (var i = 0; i < tds.length; i++) {
            // unless it has class border-none set border
            if (tds[i].classList.contains('no-border')) {
                continue;
            }
            tds[i].style.border = '1px solid black';
        }


        // Create a Selection object
        var selection = window.getSelection();

        // Clear any existing selections
        selection.removeAllRanges();

        // Add the table range to the selection
        selection.addRange(range);

        // Execute the "copy" command
        document.execCommand('copy');

        var tds = table.getElementsByTagName('td');
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.border = '';

        }

        // Clear the selection
        selection.removeAllRanges();

        // Alert the user that the table has been copied
        alert('Table copied to clipboard!');
    },
    isLast : function(index, sannsynlighet, konsekvens, hendelser, etter) {
        if (hendelser && hendelser.length > 0) {
            var currentHendelse = hendelser[index]
            // put all hendelser with same sannsynlighet and konsekvens in a list
            var tmpList = [];
            for (var i = 0; i < hendelser.length; i++) {
                if (etter) {
                    if (hendelser[i].sannsynlighet_etter === sannsynlighet && hendelser[i].konsekvens_etter === konsekvens) {
                        tmpList.push(hendelser[i]);
                    }

                } else {
                    if (hendelser[i].sannsynlighet === sannsynlighet && hendelser[i].konsekvens === konsekvens) {
                        tmpList.push(hendelser[i]);
                    }
                }
            }

            if (tmpList[tmpList.length - 1] === currentHendelse) {
                return true;
            }
        }
        return false;
    },
};