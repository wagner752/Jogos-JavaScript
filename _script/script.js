var timerId = NULL;

function selecaoNivel(){
	var nivelJogo = document.getElementById('selecaoNivel').value;
	window.location.href = 'jogo.html?'+nivelJogo;
}

function iniciaJogo(){
	var url = window.location.search;
	var nivelJogo = url.replace("?","");
	var tempoSegundos;

//Seleção dos segundos
	if (nivelJogo == 1){
		tempoSegundos = 120;
	}

	if (nivelJogo == 2){
		tempoSegundos = 60;
	}

	if (nivelJogo == 3){
		tempoSegundos = 30;
	}

	document.getElementById('cronometroNumero').innerHTML = tempoSegundos; // Escrevendo na tela os segundos

	var quantidade = 89;
	criarBaloes(quantidade); //Cria os balões na tela

	cronometro(tempoSegundos + 1);//Contagem regresiva do cronometro
}

function criarBaloes(quantidade){
//Laço para criação de balões
	for (var i = 0; i <= quantidade ; i++){
		var balao = document.createElement("img");
		balao.src = "_imagens/balao_azul_pequeno.png";
		balao.style.margin = '10px';
		balao.id = "b" + i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao);
	}
}

function cronometro(segundos){
	segundos = segundos - 1;
	document.getElementById('cronometroNumero').innerHTML = segundos;
	timerId = setTimeout("cronometro("+segundos+")", 1000);

	//Parando cronometro
	if (segundos == 0){
		clearTimeout(timerId);
		gamerOver();
	}
}

//Estourando os balões
function estourar(balao){
	var id_balao = balao.id;

	document.getElementById(id_balao).src = '_imagens/balao_azul_pequeno_estourado.png';

	pontuacao();
}

//Atualizando na tabela
function pontuacao(){
	var balaoNormal = document.getElementById('balaoNormal').innerHTML;
	var balaoEstourado = document.getElementById('balaoEstourado').innerHTML;
	balaoNormal = parseInt(balaoNormal);
	balaoEstourado = parseInt(balaoEstourado);

	balaoNormal = balaoNormal -1;
	balaoEstourado = balaoEstourado +1;

	document.getElementById('balaoNormal').innerHTML = balaoNormal;
	document.getElementById('balaoEstourado').innerHTML = balaoEstourado;

	gamerOverWin(balaoNormal);
}


function gamerOverLoser(){
	alert("Tu perdeu otario, não clicou a tempo");
}

function gamerOverWin(balao){
	if (balao == 0){
		alert("Acabou caralho tu ganhou");
		clearTimeout(timerId);
	}
}