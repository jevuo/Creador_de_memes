"use strict"
//Declaración de variables
var valora;
var current = 0;
var imagenes = new Array();

$(function () {

    //Llamamos a la función para mostrar el mensaje emergente
    llamaValora();
    //Funcionalidad del carrusel
    var numImages = 6;
    if (numImages <= 3) {
        $('.derecha').css('display', 'none');
        $('.izquierda').css('display', 'none');
    }
    //Cuando pulsemos la flecha izquierda
    $('.izquierda').on('click', function () {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - 3;
        }
        //Animación del carrusel
        $(".carrusel").animate({
            "left": -($('#foto' + current).position().left)
        }, 600);

        return false;
    });
    //Cuando pulsemos la flecha derecha
    $('.derecha').on('click', function () {
        if (numImages > current + 3) {
            current = current + 1;
        } else {
            current = 0;
        }
        //Animación del carrusel
        $(".carrusel").animate({
            "left": -($('#foto' + current).position().left)
        }, 600);

        return false;
    });
    //Variables de los huebee
    var elem = $('.color')[0];
    var hueb = new Huebee(elem, {
        // options
        setText: '.set-text-elem'
    });

    var elem2 = $('.colorb')[0];
    var hueb2 = new Huebee(elem2, {
        // options
        setText: '.set-text-elem'
    });

    //INSERTANDO IMAGEN DESDE FUENTE EXTERNA
    //Obtiene 4 URLs de imágenes de Flickr y se la asigna a las src de las <img> de #galeria
    $('#buscar').click(function () {
        //Mostramos el carrusel al pulsar el botón y ocultamos el div que ocupaba el sitio
        $('#galeria').attr("hidden", false);
        $('#divaux').hide();
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        //Realizamos la petición
        $.getJSON(flickerAPI, {
                tags: $('#inFoto').val(),
                tagmode: "any",
                format: "json"
            })
            //done se ejecuta cuando ha terminado la operación anterior con éxito
            .done(function (data) {
                $.each(data.items, function (i, item) {
                    //Añadimos la url de la foto y el título         
                    $('#foto' + i).attr('src', item.media.m);
                    $('#foto' + i).attr('title', item.title);
                    //Sale cuando obtiene 10 fotos
                    if (i === 10) {
                        return false;
                    }
                })
            })
    });

    $('#buscar').click(function () {
        //Limpiamos el texto del input    
        $(this).val('');
    });

    //Cambiamos el texto de nuestro párrafo cada vez que se levanta una tecla en el textarea
    $('.parrafoTextArea').on('keyup', function () {
        //Variable para guardar el valor de lo que escribimos en el textarea
        var texto = $(this).val();
        //Realizamos esta acción para hacer un salto de línea cuando pulsamos intro en el textarea
        texto = texto.replace(/\n/g, "<br />");
        //Añadimos el texto al párrafo del meme con html porque añadimos saltos de línea
        $('#parrafo1').html(texto);

    });


    //Aplicamos la librería de huebee para el cambio de color de letra
    hueb.on('change', function (color, hue, sat, lum) {
        $('#parrafo1').css('color', color);
        $('#color').css('background-color', color);
    });

    //Aplicamos la librería de huebee para el cambio de color del borde de la letra
    hueb2.on('change', function (color2, hue, sat, lum) {
        $('#parrafo1').css('webkit-text-stroke-color', color2);
        $('#colorb').css('background-color', color2);
    });


    //APLICANDO CLASES CSS DE TEXTO

    //Clase borde
    $('#borde').click(function (e) {
        //Cambiamos la clase cuando pulsemos el botón
        $('#parrafo1').removeClass('parrafo');
        $('#parrafo1').addClass('borde');
        //Si el botón está en verde lo ponemos azul y quitamos el borde
        if ($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            $('#parrafo1').addClass('parrafo');
            $('#parrafo1').removeClass('borde');
        } else {
            //Si el botón está en azul lo ponemos verde y ponemos el borde
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            $('#parrafo1').removeClass('parrafo');
            $('#parrafo1').addClass('borde');
        }
    });

    //Clase negrita
    $('#negrita').click(function (e) {
        //Cambiamos la clase cuando pulsemos el botón
        $('#parrafo1').removeClass('parrafo');
        $('#parrafo1').addClass('negrita');
        //Si el botón está en verde lo ponemos azul y quitamos negrita
        if ($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            $('#parrafo1').addClass('parrafo');
            $('#parrafo1').removeClass('negrita');
        } else {
            //Si el botón está en azul lo ponemos verde y ponemos negrita
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            $('#parrafo1').removeClass('parrafo');
            $('#parrafo1').addClass('negrita');
        }
    });

    //Clase cursiva
    $('#cursiva').click(function (e) {
        //Cambiamos la clase cuando pulsemos el botón
        $('#parrafo1').removeClass('parrafo');
        $('#parrafo1').addClass('cursiva');
        //Si el botón está en verde lo ponemos azul y quitamos cursiva
        if ($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            $('#parrafo1').addClass('parrafo');
            $('#parrafo1').removeClass('cursiva');
        } else {
            //Si el botón está en azul lo ponemos verde y ponemos cursiva
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            $('#parrafo1').removeClass('parrafo');
            $('#parrafo1').addClass('cursiva');
        }
    });

    //Cambiando el tamaño de la letra
    $('.btamano').on('click', function () {
        //Cuando pulsemos el botón se aplicará el número del input al tamaño de letra
        var valorIn = parseInt($("#tamano").val());
        $('#parrafo1').css('font-size', valorIn + "px");
    });


    //Cambiando el tamaño del grosor de la letra
    $('#grosorc').on('click', function () {
        var valorActual = $('#parrafo1').css('webkit-text-stroke-width');
        //Si pulsamos y está en verde, lo ponemos a azul y quitamos grosor
        if ($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            var valorNuevo = parseInt(valorActual) - 2;
            $('#parrafo1').css('webkit-text-stroke-width', valorNuevo + "px");
        } else {
            //Si pulsamos y está en azul, lo ponemos a verde y añadimos grosor
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            var valorNuevo2 = parseInt(valorActual) + 2;
            $('#parrafo1').css('webkit-text-stroke-width', valorNuevo2 + "px");
        }
    });

    //Añadimos el evento para que se produzca al hacer doble click sobre la imagen
    $(".foto").dblclick(function () {
        //Colocamos en la imagen principal la imagen pulsada con doble click
        $("#img-meme").removeAttr("background-image");
        $("#img-meme").css("background-image", "url(" + $(this).attr('src') + ")");
    });

    //Añadimos el evento para que se produzca al pulsar intro sobre la imagen
    $(".foto").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        //Colocamos en la imagen principal la imagen pulsada con intro
        if (code == 13) {
            $("#img-meme").removeAttr("background-image");
            $("#img-meme").css("background-image", "url(" + $(this).attr('src') + ")");
        }
    })
});

//Función llamará al mensaje emergente cuando llevemos 5 minutos en la web
function llamaValora() {
    //Cuando pasen 5 minutos nos saldrá un mensaje para valorar nuestra web
    valora = setTimeout(muestraMensaje, 300000);
}

//Mensaje que mostraremos al usuario para recibir una valoración de nuestra web
function muestraMensaje() {
    Swal.fire({
        title: 'Hola!',
        icon: 'info',
        html: '<b>Te gusta nuestra web?</b><br> ' +
            'Déjanos tu valoración para seguir mejorando<br>' +
            'Gracias!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i>',
        confirmButtonAriaLabel: 'Thumbs up!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}