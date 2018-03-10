//plant constructor
function plant(species, generation, allele1, allele2){
	this.species = species;
	this.generation = generation;
	this.allele1 = allele1;
	this.allele2 = allele2;
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

//listen for input button
document.getElementById("pollinateButton").onclick = function() {
	takeInput();
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

//take user input and x-pollinate their two plants
function takeInput(){
	var plant1 = new plant(document.getElementById("p1Species").value, document.getElementById("generation").value - 1, document.getElementById("p1Allele1").value, document.getElementById("p1Allele2").value);
	var plant2 = new plant(document.getElementById("p2Species").value, document.getElementById("generation").value - 1, document.getElementById("p2Allele1").value, document.getElementById("p2Allele2").value);
	var child = xPollinate(plant1, plant2, document.getElementById("generation").value);
	displayPlant(child,"child1");
}     

function xPollinate(plant1, plant2, generation){
	
	if(plant1.species == plant2.species){
		
		var random = Math.floor(Math.random() * 2) + 1;	//random number between one and two
		if(random === 1){
			var allele1 = plant1.allele1; 
		}
		else{
			var allele1 = plant1.allele2; 
		}
		
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
		catch(err){
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

//display a plant through DOM
function displayPlant(plant, div){
	//calculate if the plant is heterozygous or homozygous
	if(plant.allele1 == plant.allele2){
		var zygous = "homozygous";
	}
	else{
		var zygous = "heterozygous";
	}
	var phenotype = plant.allele1; //allele1 is dominant
	div = document.getElementById(div);
	//console.log(div);
	//console.log(div);
	div.innerHTML = "<ul><li>Species: " + plant.species + "</li><li>" + "Generation: " + plant.generation + "</li><li>" + "Alleles: " + zygous + " " + phenotype + "</ul>";
	childInformation = plant; //cache current child
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
	var phenotype = plant.allele1; //allele1 is dominant
	window.alert("Alleles: " + zygous + " " + phenotype);
	childInformation = plant; //cache current child
}