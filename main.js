function plant(species, generation, allele1, allele2){
	this.species = species;
	this.generation = generation;
	this.allele1 = allele1;
	this.allele2 = allele2;
}

var parent1 = new plant("Tulip", 1, "red", "red");
var parent2 = new plant("Tulip", 1, "white", "white");

var child1 = xPollinate(parent1, parent1, 2);

displayPlant(child1);

function xPollinate(plant1, plant2, generation){
	
	if(plant1.species == plant2.species){
		
		var random = Math.floor(Math.random() * 2) + 1;	//random number between one and two
		if(random === 1){
			var allele1 = plant1.allele1; 
		}
		else{
			var allele1 = plant2.allele1; 
		}
		
		random = Math.floor(Math.random() * 2) + 1;
		if(random === 1){
			var allele2 = plant1.allele2; 
		}
		else{
			var allele2 = plant2.allele2; 
		}
		
		var child = new plant(plant1.species, generation, allele1, allele2);
		return child;
		
	}
	
	else{
		window.alert("The plants are not of the same species");
	}
	
}

function displayPlant(plant){
	window.alert("Species: " + plant.species);
	window.alert("Generation: " + plant.generation);
	if(plant.allele1 == plant.allele2){
		var zygous = "homozygous";
	}
	else{
		var zygous = "heterozygous";
	}
	var phenotype = plant.allele1;
	window.alert("Alleles: " + zygous + " " + phenotype);
}