function handle_graph_click(event) {
    console.log("handled");
    let xPosition = 0;
    let yPosition = 0;

    let el = event.target;

    while (el) {
        if (el.tagName === "BODY") {
            var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
            var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
            xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
            yPosition += (el.offsetTop - yScrollPos + el.clientTop);
        }
        else {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }

    console.log(xPosition + event.clientX, yPosition + event.clientY);
}