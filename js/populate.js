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
        ${season}
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
    <div class="entry">
        <div class="${entry.branch}">
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

$("#birthday").html("23.11.1979");