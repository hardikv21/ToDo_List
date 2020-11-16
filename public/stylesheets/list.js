$(".fa-plus-square").on("click", function()
{
    $("input[type='text']").fadeToggle();
    $("button").fadeToggle();
});

$("ul").on("click", "li", function()
{
    $(this).toggleClass("li_effect");
});

$("ul").on("click", "span", function(event)
{
    $(this).parent().fadeOut(1000, function(){});
    $("form").submit();
    event.stopPropagation();
});