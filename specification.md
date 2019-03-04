Na linguagem de sua preferência, crie um servidor HTTP que, para 
cada requisição GET, retorne um JSON cuja chave extenso seja a 
versão por extenso do número inteiro enviado no path. Os números 
podem estar no intervalo [-99999, 99999]. 

Exemplos: 

λ curl -v http://localhost:3000/1 
{ "extenso": "um" } 

λ curl -v http://localhost:3000/-1042 
{ "extenso": "menos mil e quarenta e dois" } 

λ curl -v http://localhost:3000/94587 
{ "extenso": "noventa e quatro mil e quinhentos e oitenta e sete" } 

* Nos mande o link do repositório no GitHub com o código. 
* Não esqueça do README.md com as instruções para rodar o 
servidor! 
* Não esqueça dos "e"s separando milhares, centenas e dezenas 
(vide exemplo). 
* É esperado que o código implemente o algoritmo. 
* Mesmo que não esteja com a lógica completa, nos envie o que 
conseguiu fazer até o momento. 

Em caso de dúvidas sobre o desafio, mande um email para 
ept@certi.org.br e mzr@certi.org.br. 

_Bônus_: No GitHub, abra um Pull Request com seu código (p.ex. do 
seu branch de desenvolvimento para o master). Isso facilita nossa 
revisão. 

_Bônus_: Crie um ambiente Docker para que possamos rodar seu 
servidor sem instalar dependências locais. 