var $seasons = {};
var $seasonKeys = [];

$.getJSON( "../data/courses.json", function( data ) {
    $.each(data, function(_, element) {
        var items = [];
        var season = element.start + "/" + (element.start + 1);
        if (season in $seasons) {
            $seasons[season].push(element);
        }
        else {
            $seasons[season] = [ element ];
            $seasonKeys.push(season);
        }
    });
    $.each($seasonKeys, function(i, key) {
        var val = $seasons[key];
        var HTML = `<div class="season">${seasonDiv(key)} ${seasonContent(val)}</div>`;
        $(HTML).prependTo(".rows");
    });
});

function seasonDiv(season) {
    return `
    <div class="season__title">
        <div class="flex-padding10">
            ${season}
        </div>
    </div>`;
}

function seasonContent(content) {
    return `
    <div class="season__content">
        ${formatEntries(content)}
    </div>`;
}

function formatEntries(entries) {
    var result = "";
    entries.forEach(entry => result += formatEntry(entry));
    return result;
}

function formatEntry(entry) {
    return `
    <div class="entry flex-padding10">
        <div class="branch ${entry.branch}">
            ${entry.branch}
        </div>
        <div class="subject-and-level">
            <div class="subject">
                ${entry.subject}
            </div>
            <div class="level">
                ${entry.level}
            </div>
        </div>
        <div class="participants">
            ${entry.participants} elev${entry.participants == 1 ? "" : "er"}
        </div>
        <div class="content">
            &bullet; ${entry.content}
        </div>
        <div class="comment">
            ${entry.comment ? "#" + entry.comment : ""}
        </div>
    </div>
    `;
}

var today = new Date();
var birthday = new Date();
birthday.setFullYear(1979);
birthday.setMonth(11);
birthday.setDate(23);
birthday.setHours(0);
birthday.setMinutes(0);
birthday.setSeconds(0);
birthday.setMilliseconds(0);
var birthdayThisYear = new Date();
birthdayThisYear.setMonth(11);
birthdayThisYear.setDate(23);
birthdayThisYear.setHours(0);
birthdayThisYear.setMinutes(0);
birthdayThisYear.setSeconds(0);
birthdayThisYear.setMilliseconds(0);
var years = (today.getUTCFullYear() - birthday.getUTCFullYear());
if (birthdayThisYear > today) {
    years -= 1;
}

$("#birthday").html(`23.11.1979 (${years} år)`);

$("#person-img").mouseover((event) => {
    $("#person-info").addClass("active");
    event.stopPropagation();
});

$("#math-intro").mouseover((event) => {
    $("#person-info").removeClass("active");
    $("#geometric-animation").addClass("active");
    animateGeometricSum();
    event.stopPropagation();
});

$('html').mouseover(() => {
    $("#person-info").removeClass("active");
    $("#geometric-animation").removeClass("active");
});

var divElement = document.getElementById("geometric-animation");
var svg = d3.select(divElement).append("svg");
var width = Math.min(200, divElement.clientWidth);
var height = Math.min(150, divElement.clientHeight);
svg
    .attr("width", width)
    .attr("height", height);

// Generate base graph for geometric sum
var size = 0.8 * height;
var left = 2;
var strokeWidth = 1;
var infiniteSum = "";
for (var i = 0; i < 6; i++) {
    svg.append("rect")
        .attr("class", "empty-rect")
        .attr("x", left)
        .attr("y", height * 0.9 - size)
        .attr("width", size)
        .attr("height", size)
        .attr("stroke-width", strokeWidth);
    
    left += size * 1.05 + 4;
    size *= 0.5;
    strokeWidth *= 0.5;
    infiniteSum += `\\frac{1}{4${i > 0 ? "^" + (i + 1): ""}} + `;
}
$("#infinite-sum").html(`
\\[
    ${infiniteSum} ...=?
\\]
`);


function animateGeometricSum() {
    var width = Math.min(200, divElement.clientWidth);
    var height = Math.min(150, divElement.clientHeight);
    svg
        .attr("width", width)
        .attr("height", height);
}