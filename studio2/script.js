(function() {
    'use strict';

    var heading = document.querySelector('h1');
    var overlays = document.querySelectorAll('.overlay');

    document.querySelectorAll('p').forEach(function(paragraph, index) {
        var displayText = paragraph.getAttribute('data-text');

        paragraph.addEventListener('mouseover', function() {
            heading.innerHTML = displayText;
            overlays[index].style.display = 'block';
        });

        paragraph.addEventListener('mouseout', function() {
            heading.innerHTML = "Hover over a box to see a sketch";
            overlays[index].style.display = 'none';
        });
    });
})();