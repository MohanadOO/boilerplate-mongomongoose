require("dotenv").config();
var mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let mrL = new Person({
    name: "L",
    age: 15,
    favoriteFoods: ["Rice", "Big Mac"],
  });

  mrL.save((error, data) => {
    if (error) return console.log(error);
    else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  {
    name: "M",
    age: 18,
    favoriteFoods: ["Burger", "Big Mac"],
  },

  {
    name: "L",
    age: 20,
    favoriteFoods: ["Chiken", "Cheese"],
  },

  {
    name: "G",
    age: 15,
    favoriteFoods: ["Rice"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) return console.log(error);

    done(null, createdPeople);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) return console.log(error);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) return console.log(error);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    return error ? console.log(error) : done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, result) => {
    if (error) return console.log(error);

    result.favoriteFoods.push(foodToAdd);
    result.save((error, date) => {
      return error ? console.log(error) : done(null, date);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (error, date) => {
      if (error) return console.log(error);
      done(date);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) return console.log(error);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (error, data) => {
    return error ? console.log(error) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((error, data) => {
      return error ? console.log(error) : done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
