//plant constructor
function plant(species, generation, allele1, allele2){
	this.species = species;
	this.generation = generation;
	this.allele1 = allele1;
	this.allele2 = allele2;
}

//results object
var results = {};

//reset results function
function resetResults(){
	results = {};
	document.getElementById("displayResults").innerHTML = "Waiting for results...";
}

//allele dominance (lower index = more dominant)
//to do: support co-dominant alleles (array in object?)
var alleleHierarchy = {
	Tulip: ["red","white"],
}

//where current displayed child is chached
var childInformation = null;

//listen for clone button
document.getElementById("cloneButton").onclick = function() {
	document.getElementById("p2Species").value = document.getElementById("p1Species").value;
	document.getElementById("p2Allele1").value = document.getElementById("p1Allele1").value;
	document.getElementById("p2Allele2").value = document.getElementById("p1Allele2").value;
};

//transfer child to parent 1
document.getElementById("transferButton1").onclick = function() {
	document.getElementById("p1Species").value = childInformation.species;
	document.getElementById("p1Allele1").value = childInformation.allele1;
	document.getElementById("p1Allele2").value = childInformation.allele2;
	document.getElementById("generation").value = parseInt(childInformation.generation) + 1;
};

//transfer child to parent 2
document.getElementById("transferButton2").onclick = function() {
	document.getElementById("p2Species").value = childInformation.species;
	document.getElementById("p2Allele1").value = childInformation.allele1;
	document.getElementById("p2Allele2").value = childInformation.allele2;
	document.getElementById("generation").value = parseInt(childInformation.generation) + 1;
};

//take user input and x-pollinate their two plants (triggered by x-pollinate button)
function takeInput(count){
	var plant1 = new plant(document.getElementById("p1Species").value, document.getElementById("generation").value - 1, document.getElementById("p1Allele1").value, document.getElementById("p1Allele2").value);
	var plant2 = new plant(document.getElementById("p2Species").value, document.getElementById("generation").value - 1, document.getElementById("p2Allele1").value, document.getElementById("p2Allele2").value);
	for(var i = 0; i < count; i++){
		var child = xPollinate(plant1, plant2, document.getElementById("generation").value);
		displayPlant(child,"child1");
	}
}     

//x-pollinate two plants
function xPollinate(plant1, plant2, generation){
	
	if(plant1.species == plant2.species){ //check plant species are the same
		
		//pick which alleles are from which parent
		//allele1
		var random = Math.floor(Math.random() * 2) + 1;	//random number between one and two
		if(random === 1){
			var allele1 = plant1.allele1; 
		}
		else{
			var allele1 = plant1.allele2; 
		}
		//allele2
		random = Math.floor(Math.random() * 2) + 1;
		if(random === 1){
			var allele2 = plant2.allele1; 
		}
		else{
			var allele2 = plant2.allele2; 
		}
		
		try{
			var possibleAlleles = alleleHierarchy[plant1.species];
			//find which allele is dominant, and put it in the allele1 slot
			if(findInArray(allele1, possibleAlleles) < findInArray(allele2, possibleAlleles)){
				//allele1 is dominant
			}
			else if(findInArray(allele1, possibleAlleles) > findInArray(allele2, possibleAlleles)){
				//allele2 is dominant
				//swap alleles
				var mem = allele1;
				allele1 = allele2;
				allele2 = mem;
			}
			else if(findInArray(allele1, possibleAlleles) == findInArray(allele2, possibleAlleles)){
				//alleles are co-dominant (homozygous)
			}
			else{
				window.alert("x-Pollination failed. Reason: a plant allele does not exist.");
			}
			
			//make child
			var child = new plant(plant1.species, generation, allele1, allele2);
			return child;
		}
		catch(err){ //error is thrown if a hierarchy array does not exist for the inputted species
			window.alert("x-Pollination failed. Reason: the plant species does not exist.");
		}
		
	}
	
	else{
		window.alert("x-Pollination failed. Reason: the plants are not of the same species.");
	}
	
}

//find allele in array
function findInArray(value, array){
	for(var i = 0; i < array.length; i++){
		if(value == array[i]){
			return i;
		}
	}
	return "null";
}

//store plant data in results section
function storeResults(plant){
	var zygous = isZygous(plant) + " ";
	var phenotype = plant.allele1; //allele1 is dominant, so is used as the phenotype (appearance)
	
	if(results[zygous + plant.allele1] == null){ //check if there is already a piece of data in results for that outcome
		results[zygous + plant.allele1] = 1;
	}
	else{ //otherwise make a piece of data in results for that outcome
		results[zygous + plant.allele1]++;
	}
	
	//update results table via DOM
	document.getElementById("displayResults").innerHTML = JSON.stringify(results);
}

//display a plant through DOM
function displayPlant(plant, div){
	//calculate if the plant is heterozygous or homozygous
	var zygous = isZygous(plant);
	var phenotype = plant.allele1; //allele1 is dominant, so is used as the phenotype (appearance)
	div = document.getElementById(div);
	//console.log(div);
	div.innerHTML = "<ul><li>Species: " + plant.species + "</li><li>" + "Generation: " + plant.generation + "</li><li>" + "Alleles: " + zygous + " " + phenotype + "</ul>";
	childInformation = plant; //store current child
	
	//console log for debugging
	console.log(plant);
	
	//check if the plant should be stored in results
	if(document.getElementById("generationTrack").value == plant.generation){
		storeResults(plant);
	}
}

//check if plant is homozygous (both alleles the same) or heterozygous (both alleles different)
function isZygous(plant){
	if(plant.allele1 == plant.allele2){
		var zygous = "homozygous";
	}
	else{
		var zygous = "heterozygous";
	}
	return zygous;
}

//display a plant through alerts (old)
function displayPlantOld(plant){
	window.alert("Species: " + plant.species);
	window.alert("Generation: " + plant.generation);
	//calculate if the plant is heterozygous or homozygous
	if(plant.allele1 == plant.allele2){
		var zygous = "homozygous";
	}
	else{
		var zygous = "heterozygous";
	}
	var phenotype = plant.allele1; //allele1 is dominant, so is used as the phenotype (appearance)
	window.alert("Alleles: " + zygous + " " + phenotype);
	childInformation = plant; //cache current child
}