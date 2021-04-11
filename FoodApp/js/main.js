
import {imgLoader, recepiesContainer, btnSubmit, searchInput, healt, diet, div, pages, arrowUp, arrowDown, arrowButton, recepiesCount, inputMinCal, inputMaxCal, startNumberOfRecepies, enter} from './helper.js'
import {apiId, appKey} from './api.js';

/////////////////////////////////////////////////////////////////////////////////


searchInput.onkeyup = () => {
	if(searchInput.value != "") {
		btnSubmit.disabled = false
	} else {
		btnSubmit.disabled = true;
	}
}

const getRecepics = (searchPath, healt, diet, minCl, maxCl) => {

	const healtUrl = healt ? "&health=" + healt : '';
	const dietUrl = diet ? "&diet=" + diet : '';
	const minCal = minCl ? minCl + '-' : '';
	const maxCal = maxCl ? maxCl : '';
	const cal = minCl || maxCl ? "&calories=" + minCal + maxCal : '';

	fetch(`https://api.edamam.com/search?q=${searchPath}&app_id=${apiId}&app_key=${appKey}${startNumberOfRecepies}${cal}${healtUrl}${dietUrl}`,{
			headers: {
				appKey: 'e1f28a57b39d21d50aaf9c5d52c837d1'
			}
	})

	.then(response  => {

		if(response.ok) {
			loader(imgLoader);
			return response.json();
		} else {
			alert("Api response error");
		}
	})

	.then(data => {
		imgLoader.remove();
		listRecipes(data.hits);
		countRecipes(data);
	})

	.catch(error => alert(error));
}

const countRecipes = numberOfRecipes => {

	recepiesCount.innerHTML = numberOfRecipes.count;
	recepiesPages(numberOfRecipes);
}

const recepiesPages = numberOfRecipes => {

	for(let i = 0; i < (numberOfRecipes.count/10) ; i++){

		const art = document.createElement('button');
		art.setAttribute('class', 'pages');
		div.append(art);
		art.innerHTML += i + 1;

		art.addEventListener('click',() => {
			
				startNumberOfRecepies ="&from=" + i * 10;

				getRecepics(searchInput.value,healt.value, diet.value, inputMinCal.value,inputMaxCal.value);		
		})
	}

	if(numberOfRecipes.count == 0){
		alert("Sory no recipes by this name")
	}
	
	setArrow();
}

const setArrow = () => {
	arrowUp.setAttribute('src', './img/arrow.png');
	arrowDown.setAttribute('src', './img/arrow.png');
	arrowButton[0].style.display = 'block';
	arrowButton[1].style.display = 'block';
	div.classList.add('conteiner_pagination');
}

const listRecipes = recipes => {
	div.innerHTML = "";
	recepiesContainer.innerHTML = "";
	recipes.forEach(recipe => {
		addRecipe(recipe);
	});
}

const addRecipe = recipeData => {

	const recipeElement = document.createElement("section");
	recipeElement.classList.add("recipe-element");

	createRecepies(recipeData,recipeElement);
}

const createRecepies = (recipeData,recipeElement) => {
	const calories = '<div class="calories">' + (recipeData.recipe.calories/recipeData.recipe.yield).toFixed() + '</div>';
	let foodImg = '<img src="' + recipeData.recipe.image + '"/>';
	let foodName = '<h3>' + recipeData.recipe.label + '</h3>';
	let conteinerForHealthLabels = '<section class="labels">';

	const myLabels = recipeData.recipe.healthLabels;

	myLabels.map(element => {
		const healthLabels = '<article class="label">' + element +'</article>';
		conteinerForHealthLabels += healthLabels;
	})
	conteinerForHealthLabels += '</section>';

	createCard(recipeElement,calories,foodImg,foodName,conteinerForHealthLabels,myLabels);
}


const createCard = (recipeElement,calories,foodImg,foodName,conteinerForHealthLabels,myLabels) => {
	recipeElement.innerHTML = foodImg + foodName + conteinerForHealthLabels + calories;
	recepiesContainer.prepend(recipeElement);
}

const loader = gif => {
	const divImg = document.querySelector(".loader");
	gif.setAttribute("src", "./img/loader.gif");
	divImg.prepend(gif);
}

arrowUp.addEventListener('click',() => {

	div.append(pages[0],pages[1],pages[2],pages[3],pages[4]);
});

arrowDown.addEventListener('click',() => {
	const lastPageRecepiset = div.lastElementChild;
	const firstFromBehindRecepiestPage = lastPageRecepiset.previousElementSibling;
	const secondFromBehindRecepiestPage = firstFromBehindRecepiestPage.previousElementSibling;
	const thirdFromBehindRecepiestPage = secondFromBehindRecepiestPage.previousElementSibling;
	const fourthFromBehindRecepiestPage = thirdFromBehindRecepiestPage.previousElementSibling;
	

	div.prepend(fourthFromBehindRecepiestPage, thirdFromBehindRecepiestPage,secondFromBehindRecepiestPage, firstFromBehindRecepiestPage, lastPageRecepiset);
});

const createListener = element => {
	element.addEventListener("keyup", e => {

		  if (e.keyCode === enter) {
		   e.preventDefault();
		   document.getElementById("btnSubmit").click();
		  }
	});
}

const showData = () => {

	btnSubmit.addEventListener('click', () => {
		
		getRecepics(searchInput.value, healt.value, diet.value, inputMinCal.value, inputMaxCal.value);

	});	
			createListener(searchInput);

			createListener(inputMinCal);
				
			createListener(inputMaxCal);
}

showData();