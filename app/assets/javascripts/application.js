// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//

//= require rails-ujs

//--- Angle
//= require angle/modules/common/wrapper.js
//= require angle/app.init
//= require_tree ./angle/modules
//= require_tree ./angle/custom

////= require jquery3
////= require bootstrap
//= require turbolinks

//= require filterrific/filterrific-jquery

//= require components/datepicker

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// for image preview for file fields
// div where image will be added should have id="target"
const HEIGHT = 150;
const WIDTH = 150;
$(document).on('change', '#pictureInput', function (event) {
    let files = event.target.files;

    Array.from(files).forEach(file => {
        let reader = new FileReader();
        reader.onload = function (file) {
            let img = new Image();
            img.src = file.target.result;
            img.classList.add("img-thumbnail");
            img.setAttribute('alt', 'rss fit');
            img.setAttribute('height', HEIGHT);
            img.setAttribute('width', WIDTH);
            $('#target').append(img);
            $('img').css("display", "inline-block")
        };
        reader.readAsDataURL(file);
    });

    if (Array.from(files).length > 0) {
        $('#target').empty();
    }
});

$(document).on('click', '.remove_fields', function (e) {
    //elimina el partial que tiene estos enlaces
    $(this).closest('fieldset').detach();
    e.preventDefault()
});

$(document).on('click', '.show_fields', function (e) {
    $(this).siblings('.ocultar').fadeIn(400)
    $(this).siblings('.description').text('')
    //console.log($(this).siblings('.ocultar').find('.room_name').val())

});

$(document).on('click', '.hide_fields', function (e) {
    $(this).siblings('.ocultar').fadeOut(400)
    let description = $(this).siblings('.ocultar').find('.room_name').val()
    $(this).siblings('.description').text(description)
    //console.log($(this).siblings('.ocultar').find('.room_name').val())
});


$(document).on('click', '.add_fields', function (e) {
    $('.ocultar').fadeOut(400)
    let description = $('.room_name').last().val()
    $('.description').last().text(description)

    let time = new Date().getTime()
    let regexp = new RegExp($(this).data('id'), 'g')
    //console.log()
    $(this).before($(this).data('fields').replace(regexp, time))
    e.preventDefault()
});