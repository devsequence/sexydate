$('.nav-btn').on('click', function (e) {
    var $this = $(this);
     $this.find('.icon').toggleClass('hidden');
     $('.header-mobile').toggleClass('is-open');
     $('body').toggleClass('scroll');
});
$('.step-btn').on('click', function (e) {
    var $this = $(this);
    var $thisData = $this.data('step');

    // $('.form-step__item').removeClass('active');
    // $('.step-item').removeClass('active');
    // $('div[data-step = '+$thisData+']').addClass('active');
});

$('.btn-popup').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $thisData = $this.data('popup');
    $('.popup').removeClass('active');
    $('div[data-popup = '+$thisData+']').addClass('active');
    $('body').addClass('scroll');

});
$('.btn-popup-info').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $thisParentPopup = $this.parents('.item-models');
    var $thisData = $this.data('popup');
    var $thisText = $this.parent().parent().find('.item-models__text').text();
    var $thisInfo = $this.parent().parent().find('.item-models__info').html();
    var $thisPopup = $('div[data-popup = '+$thisData+']');
    $('.popup').removeClass('active active-special');
    $thisPopup.find('.popup-image__info').html($thisInfo);
    $thisPopup.find('.popup-image__text').html($thisText);

    if($thisParentPopup.hasClass('item-special')){
        $thisPopup.addClass('active  active-special');
    }else {
        $thisPopup.addClass('active');
    }
    initSlider();
    $('body').addClass('scroll');

});

function initSlider(){
    $('.popup-image__slider').slick({
        prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
        nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
    });
}
$('.location-list').slick({
    prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-arrow\"></use></svg></button>",
    nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-arrow\"></use></svg></button>",
    infinite: false,
    slidesToShow: 8,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {

            }
        }
    ]
});

$('.models-slider').slick({
    prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
    nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
});
$('.popup-close, .popup-overlay').on('click', function (e) {
    $('.popup').removeClass('active');
    $('body').removeClass('scroll');
    $('.popup-image__slider').slick("unslick");
});



function CustomUpload(element) {
    let ref = this;
    this.imageFileArray = [];
    this.element = $(element);
    this.element.on('change', async function (e) {
        let arrayImage = e.target.files;
        let start = ref.imageFileArray.length;
        let validExt = ['image/jpg', 'image/jpeg', 'image/png'];
        $.each(arrayImage, (index, item) => {
            if ($.inArray(item.type,validExt) != -1) {
                item.index = start + index;
                ref.imageFileArray.push(item);
                let fr = new FileReader();
                let imageItem = '';
                fr.onload = function (event) {
                    imageItem += `
                    <div class="photo-upload"
                    style="background: url('${event.target.result}')">
                    <span data-key="${item.index}" class="custom-file-preview-del">
                    <svg class="icon"><use xlink:href="#ic-close"></use></svg></span>
                    </div>
                    `;
                    $('.photo-wrap .photo-item').remove();
                    $('.photo-wrap').append(imageItem);
                }
                fr.readAsDataURL(item);

            }else{
                alert('This is not an image');
            }
            //Array images
            console.log(ref.imageFileArray);
        });
    });
    this.element.parent().on('click', '.custom-file-preview-del', function (e) {
        e.preventDefault();
        let del = $(this);
        let id = del.data('key');
        let index = ref.imageFileArray.findIndex(item => {
            return item.index == id;
        });
        ref.imageFileArray.splice(index, 1);
        del.parent().remove();
        //Array after deleted
        console.log(ref.imageFileArray);
    });
}
const upload = new CustomUpload('#fileImage');
$('.photo-item').on('click', function (e) {
   $('.upload-photo').trigger('click');
});