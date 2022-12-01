const firstColor = "black"
const secondColor = "white"

const stage = acgraph.create("graph-holder")

const x_focused_input = document.querySelector("#hidden-focused-x-holder input")
const y_focused_input = document.querySelector("#hidden-focused-y-holder input")
const r_focused_input = document.querySelector("#hidden-focused-r-holder input")
const result_focused_input = document.querySelector("#hidden-focused-result-holder input")

const x_val = parse_x_val()
const y_val = parse_y_val()
const r_val = parse_r_val()
const result_val = parse_result_val()

function parse_x_val() {
    if (x_focused_input != null) return parseFloat(x_focused_input.value)
    return NaN
}

function parse_y_val() {
    if (y_focused_input != null) return parseFloat(y_focused_input.value)
    return NaN
}

function parse_r_val() {
    if (r_focused_input != null) return parseFloat(r_focused_input.value)
    return NaN
}

function parse_result_val() {
    if (x_focused_input != null) return x_focused_input.value === "true";
    return null
}

class Attempt {
    constructor(x, y, r, result) {
        this.x = x
        this.y = y
        this.r = r
        this.result = result
    }
}

function drawCoordinates(stage, width, height, xMiddle, yMiddle, r) {
    let linePath = stage.path()
    let textStyle = {fontSize: Math.round(r / 13), fontFamily: "Roboto", color: firstColor}

    //drawing vertical arrow
    linePath.moveTo(xMiddle, 0)
    linePath.lineTo(xMiddle, height)
    linePath.moveTo(xMiddle - r / 30, r / 20)
    linePath.lineTo(xMiddle, 0)
    linePath.lineTo(xMiddle + r / 30, r / 20)
    stage.text(xMiddle + r / 30, 0, "Y", textStyle)

    //drawing horizontal arrow
    linePath.moveTo(0, yMiddle)
    linePath.lineTo(width, yMiddle)
    linePath.moveTo(width - r / 20, yMiddle - r / 30)
    linePath.lineTo(width, yMiddle)
    linePath.lineTo(width - r / 20, yMiddle + r / 30)
    stage.text(width - r / 20, yMiddle + r / 30, "X", textStyle)

    //drawing marks
    linePath.moveTo(xMiddle - r / 40, yMiddle - r / 2)
    linePath.lineTo(xMiddle + r / 40, yMiddle - r / 2)
    stage.text(xMiddle + r / 40, yMiddle - r / 2, "R/2", textStyle)

    linePath.moveTo(xMiddle - r / 40, yMiddle - r)
    linePath.lineTo(xMiddle + r / 40, yMiddle - r)
    stage.text(xMiddle + r / 40, yMiddle - r, "R", textStyle)

    linePath.moveTo(xMiddle - r / 40, yMiddle + r / 2)
    linePath.lineTo(xMiddle + r / 40, yMiddle + r / 2)
    stage.text(xMiddle + r / 40, yMiddle + r / 2, "-R/2", textStyle)

    linePath.moveTo(xMiddle - r / 40, yMiddle + r)
    linePath.lineTo(xMiddle + r / 40, yMiddle + r)
    stage.text(xMiddle + r / 40, yMiddle + r, "-R", textStyle)

    linePath.moveTo(xMiddle + r / 2, yMiddle - r / 40)
    linePath.lineTo(xMiddle + r / 2, yMiddle + r / 40)
    stage.text(xMiddle + r / 2, yMiddle + r / 40, "R/2", textStyle)

    linePath.moveTo(xMiddle + r, yMiddle - r / 40)
    linePath.lineTo(xMiddle + r, yMiddle + r / 40)
    stage.text(xMiddle + r, yMiddle + r / 40, "R", textStyle)

    linePath.moveTo(xMiddle - r / 2, yMiddle - r / 40)
    linePath.lineTo(xMiddle - r / 2, yMiddle + r / 40)
    stage.text(xMiddle - r / 2, yMiddle + r / 40, "-R/2", textStyle)

    linePath.moveTo(xMiddle - r, yMiddle - r / 40)
    linePath.lineTo(xMiddle - r, yMiddle + r / 40)
    stage.text(xMiddle - r, yMiddle + r / 40, "-R", textStyle)

    linePath.stroke(firstColor)
}


function drawShape(stage, width, height, xMiddle, yMiddle, r) {
    let linePath = stage.path()

    linePath.moveTo(xMiddle, yMiddle-r/2)
    //drawing arc
    linePath.arcTo(r/2, r/2, 270, 90, r/2)

    //drawing triangle
    linePath.lineTo(xMiddle, yMiddle+r/2)

    //drawing rectangle
    linePath.lineTo(xMiddle-r, yMiddle+r/2)
    linePath.lineTo(xMiddle-r, yMiddle)
    linePath.lineTo(xMiddle, yMiddle)
    linePath.lineTo(xMiddle, yMiddle-r/2)

    linePath.stroke(firstColor)
}


function drawAttempt(stage, width, height, xMiddle, yMiddle, r, result) {
    console.log(result)
    if (result !== 0) {
        stage.circle(xMiddle + (result.x / result.r) * r, yMiddle - (result.y / result.r) * r, 2).stroke(firstColor).fill(firstColor)
        console.log("yep")
    }
}


function plotGraph() {
    stage.removeChildren()
    const width = document.getElementById("graph-holder").clientWidth
    const height = document.getElementById("graph-holder").clientHeight
    const xMiddle = width / 2
    const yMiddle = height / 2
    const r = Math.min(width, height) * 0.4

    console.log(width)
    console.log(height)

    drawCoordinates(stage, width, height, xMiddle, yMiddle, r)

    drawShape(stage, width, height, xMiddle, yMiddle, r)

    drawAttempt(stage, width, height, xMiddle, yMiddle, r, getFocusedAttempt())
}

function getFocusedAttempt() {
    console.log(x_val, y_val, r_val, result_val)
    if (!(isNaN(x_val) || isNaN(y_val) || isNaN(r_val))) return new Attempt(x_val, y_val, r_val, result_val)
    else return 0
}

window.onload = function() {
    plotGraph
    stage.addEventListener("click", handle_graph_click, false);
}
window.onresize = plotGraph