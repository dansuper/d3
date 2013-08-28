var tooltipEl, tooltipTemplate;

function initTooltip() {
    tooltipEl = d3.select('#tooltip');
    tooltipTemplate = _.template(document.getElementById('tooltipTemplate').innerHTML);
}

function showTooltip(d) {
    tooltipEl.html(tooltipTemplate(d));
    tooltipEl.attr('class', d.cargotipo).style('display', 'block');
}

function hideTooltip() {
    tooltipEl.style('display', 'none');
}

function moveTooltip(event) {
    tooltipEl.style('top', event.pageY + 2 + 'px');
    tooltipEl.style('left', event.pageX + 2 + 'px');
}
