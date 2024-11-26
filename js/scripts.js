// scripts.js

$(document).ready(function() {
    // AJAX відправка форми
    $('#registration-form').on('submit', function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'submit.php', // Шлях до серверного скрипту
            data: formData,
            success: function(response) {
                $('#form-message').text(response.message).css('color', 'green');
                $('#registration-form')[0].reset();
            },
            error: function(xhr, status, error) {
                $('#form-message').text('Помилка при відправці форми').css('color', 'red');
            }
        });
    });

    // Перемикання мов
    $('#language-selector').on('change', function() {
        const selectedLang = $(this).val();
        $('[data-lang-en], [data-lang-uk]').each(function() {
            const enText = $(this).attr('data-lang-en');
            const ukText = $(this).attr('data-lang-uk');
            if (selectedLang === 'en') {
                if (enText !== undefined) {
                    $(this).text(enText);
                }
            } else if (selectedLang === 'uk') {
                if (ukText !== undefined) {
                    $(this).text(ukText);
                }
            }
            // Додайте інші мови за необхідності
        });
    });

    // Ініціалізація Bootstrap Carousel (слайдера)
    $('#imageCarousel').carousel({
        interval: 3000,
        wrap: true
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('sticky-active');
        } else {
            $('.navbar').removeClass('sticky-active');
        }
    });
});
