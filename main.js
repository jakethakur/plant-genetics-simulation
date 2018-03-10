function plant(species, generation, allele1, allele2){
	this.species = species;
	this.generation = generation;
	this.allele1 = allele1;
	this.allele2 = allele2;
}

var alleleHierarchy = {
	Tulip: ["red","white"],
}

var parent1 = new plant("Tulip", 1, "red", "red");
var parent2 = new plant("Tulip", 1, "white", "white");

//var other1 = new plant("Tulip", 2, "red", "white");
//var other2 = new plant("Tulip", 2, "red", "white");

var generationCount = 1;

generationCount++;
var child1 = xPollinate(parent1, parent2, generationCount);
var child2 = xPollinate(parent1, parent2, generationCount);

generationCount++;
var x = xPollinate(child1, child2, generationCount);

displayPlant(x,"child1");

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
				window.alert("xPollination failed. Reason: unknown issue with allele domination (consult Jake).");
			}
			
			//make child
			var child = new plant(plant1.species, generation, allele1, allele2);
			return child;
		}
		catch(err){
			window.alert("xPollination failed. Reason: the plant species does not exist.");
		}
		
	}
	
	else{
		window.alert("xPollination failed. Reason: the plants are not of the same species.");
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
	console.log(div);
	div.innerHTML = "Species: " + plant.species + "<br>" + "Generation: " + plant.generation + "<br>" + "Alleles: " + zygous + " " + phenotype;
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
}