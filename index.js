
let nombre = '';
let dificultad = '1';
let aciertos = 0;
let preguntasJuego = 10;
let mostrarRespuesta = false;
let numeroPregunta = 0;
let numeroPreguntaJuego = 5;
let color = '';

const CreatePageDatos = () => {
    const body = document.getElementById("app")
    body.innerHTML = '';
    
    const article = document.createElement("article");
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.innerHTML = "Nombre del juego";
    const p = document.createElement("p");
    p.innerHTML = "Bienvenido al juego";
    header.appendChild(h1);
    header.appendChild(p);
    article.appendChild(header);

    const form = document.createElement("form");
    const labelName = document.createElement("label");
    const spanName = document.createElement("span");
    spanName.innerHTML = "Nombre"
    const input = document.createElement("input");
    input.setAttribute('type', 'text')
    input.addEventListener("change", (event)=>{
        nombre = event.target.value;
    })

    labelName.appendChild(spanName);
    labelName.appendChild(input);

    form.appendChild(labelName)

    const labelDif = document.createElement("label");
    const spanDif = document.createElement("span");
    spanDif.innerHTML = "Dificultad";
    const select = document.createElement('select');
    select.addEventListener('change', (event)=>{
        dificultad = event.target.value;
    })
    const option1 = document.createElement('option');
    option1.innerHTML = "Fácil";
    option1.setAttribute('value', '1');
    const option2 = document.createElement('option');
    option2.innerHTML = "Normal";
    option2.setAttribute('value', '2');
    const option3 = document.createElement('option');
    option3.innerHTML = "Dificil";
    option3.setAttribute('value', '3');
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    labelDif.appendChild(spanDif);
    labelDif.appendChild(select);
    form.appendChild(labelDif);

    const labelColor = document.createElement('label');
    const spanColor = document.createElement('span');
    spanColor.innerHTML = "Color de fondo";
    const colorI = document.createElement('input');
    colorI.setAttribute('type', 'color');
    colorI.addEventListener('change', (e) => {
        color = e.target.value;
        const r = document.querySelector(':root');
        r.style.setProperty('--bg-color', color);
    })
    labelColor.appendChild(spanColor);
    labelColor.appendChild(colorI);
    form.appendChild(labelColor);
    const labelMostrar = document.createElement('label');
    const spanMostrar = document.createElement('span');
    spanMostrar.innerHTML = '¿Desea conocer la respuesta correcta mientras juega?';
    const mostrar = document.createElement('input');
    mostrar.setAttribute('type','checkbox');
    mostrar.addEventListener('change', (e)=>{
        mostrarRespuesta = e.target.checked;
    })
    labelMostrar.appendChild(spanMostrar);
    labelMostrar.appendChild(mostrar);
    form.appendChild(labelMostrar);


    const labelNum = document.createElement("label");
    const spanNum = document.createElement("span");
    spanNum.innerHTML = "Cantidad de preguntas a jugar";
    const selectNum = document.createElement('select');
    selectNum.addEventListener('change', (event)=>{
        numeroPreguntaJuego = event.target.value;
    })
    const option12 = document.createElement('option');
    option12.innerHTML = "5";
    option12.setAttribute('value', '5');
    const option22 = document.createElement('option');
    option22.innerHTML = "10";
    option22.setAttribute('value', '10');
    const option32 = document.createElement('option');
    option32.innerHTML = "15";
    option32.setAttribute('value', '20');
    selectNum.appendChild(option12);
    selectNum.appendChild(option22);
    selectNum.appendChild(option32);
    labelNum.appendChild(spanNum);
    labelNum.appendChild(selectNum);
    form.appendChild(labelNum);


    const button = document.createElement('button')
    button.innerHTML = 'Aceptar'
    button.addEventListener('click',()=>{
        CreatePageQuiz();
    })
    form.appendChild(button);
    article.appendChild(form);
    body.appendChild(article);
}

const CreatePageQuiz = () => {
    const body = document.getElementById("app")
    body.innerHTML = '';
    
    const article = document.createElement("article");
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.innerHTML = `Bienvenido ${nombre} a`;
    const image = document.createElement('img');
    image.setAttribute('src', 'https://1000marcas.net/wp-content/uploads/2020/02/Marvel-Studios-Logo-2008.png');
    const h2 = document.createElement("h2");
    h2.setAttribute('id', 'aciertos')
    h2.innerHTML = `Aciertos: 0`;
    header.appendChild(h1);
    header.appendChild(h2);
    header.appendChild(image)

    const labelProgreso = document.createElement('label');
    const spanProgreso = document.createElement('span');
    const progreso = document.createElement('progress');

    spanProgreso.innerHTML = "Progreso";
    progreso.setAttribute('id', 'progreso');
    progreso.setAttribute('max', numeroPreguntaJuego);
    progreso.setAttribute('value', numeroPregunta);

    labelProgreso.appendChild(spanProgreso);
    labelProgreso.appendChild(progreso);

    header.appendChild(labelProgreso);

    article.appendChild(header);

    const quiz = document.createElement("article");
    quiz.setAttribute('class', 'quiz');
    const quizHeader = document.createElement("header");
    const quizh3 = document.createElement("h3");
    quizh3.setAttribute('id', 'quizTitle');
    quizHeader.appendChild(quizh3);

    quiz.appendChild(quizHeader);
    const quizSection = document.createElement("section");
    const quizP = document.createElement("p");
    quizP.setAttribute('id', 'quizPregunta')
    const listaRespuesta = document.createElement("ul")
    listaRespuesta.setAttribute('id', 'quizRespuestas')

    quizSection.appendChild(quizP);
    quizSection.appendChild(listaRespuesta)
    quiz.appendChild(quizSection);
    const quizFooter = document.createElement('footer');

    quizFooter.setAttribute('id', 'quizFooter');
    quizFooter.setAttribute('class', 'ocultar');

    quiz.appendChild(quizFooter);
    article.appendChild(quiz);

    const footer = document.createElement('footer')
    footer.setAttribute('id', 'siguientePregunta')
    const button = document.createElement('button')
    button.innerHTML = 'Siguiente'
    button.addEventListener('click',()=>{
        numeroPregunta++
        progreso.setAttribute('value', numeroPregunta);
        if(numeroPregunta <= numeroPreguntaJuego)
            CargarPregunta()
        else
            CargarFinJuego()
    })

    footer.appendChild(button)
    article.appendChild(footer)
    article.appendChild(footer);
    body.appendChild(article);
    CargarPregunta()
}

const CargarPregunta = () => {
    const pregunta = preguntas.filter(p => p.dificultad == dificultad)[numeroPregunta];

    document.getElementById("quizTitle").innerHTML = pregunta.titulo;
    document.getElementById("quizPregunta").innerHTML = pregunta.pregunta;
    CargarRespuestas(pregunta.respuestas, pregunta.correcta);
}

const CargarRespuestas = (respuestas, correcta) => {
    const lista = document.getElementById("quizRespuestas");
    lista.innerHTML = '';
    const footer = document.getElementById('siguientePregunta')
    const quizFooter = document.getElementById('quizFooter')
    quizFooter.setAttribute('class','ocultar')
    footer.setAttribute('class', 'ocultar');
    for(let respuesta of respuestas){
        const li = document.createElement('li');
        const spanHeader = document.createElement('span');
        const spanRespuesta = document.createElement('span');

        spanHeader.innerHTML = respuesta.item;
        spanRespuesta.innerHTML = respuesta.value;

        li.appendChild(spanHeader);
        li.appendChild(spanRespuesta);

        li.addEventListener('click',()=>{
            footer.removeAttribute('class');
            if(mostrarRespuesta){
                quizFooter.innerHTML = `La respuesta correcta es: ${correcta}`
                quizFooter.removeAttribute('class');
            }
            if(correcta == respuesta.item){

                aciertos++
                SetAciertos();
                footer.removeAttribute('class');
            }

        })
        lista.appendChild(li);
    }
}
const SetAciertos= () => {
    document.getElementById('aciertos').innerHTML = `Aciertos: ${aciertos}`;
}

const CargarFinJuego = () => {
    const body = document.getElementById("app")
    if(aciertos >= 2+numeroPreguntaJuego/2){
        body.innerHTML = `<article>
                        <header>
                            <h1>Felicidades</h1>
                            <h2></h2>
                        </header>
                        <section>
                            <p>Ganaste el juego</p>
                            <p>tuviste ${aciertos} aciertos de ${numeroPreguntaJuego} preguntas</p>
                        </section>
                        <footer>
                            <button id="verResultado">Ver resultado</button>
                        </footer>
                    </article>`;
    }
    else{
        body.innerHTML = `<article>
            <header>
                <h1>No lo has conseguido</h1>
                <h2></h2>
            </header>
            <section>
                <p>sigue intentando</p>
                <p>tuviste ${aciertos} aciertos de ${numeroPreguntaJuego} preguntas</p>
            </section>
            <footer>
                <button id="verResultado">Ver resumen</button>
            </footer>
        </article>`;
    }

    document.getElementById('verResultado').addEventListener('click', (e)=>{
        body.innerHTML = `<article>
            <header>
                <h1>Resumen de partida</h1>
                <h2></h2>
            </header>
            <section>
               
            </section>
            <footer>
            </footer>
        </article>`;
    })
    
}

window.addEventListener("load", async (event) => {
    
   CreatePageDatos();
});
