export class Ingredients{
  name ! : string;
  amount ! : number;

  constructor(name : string, amount:number){
    this.name = name;
    this.amount = amount;
  }

}

// There is a shortcut - this is similar to the above method

// export class Ingredients{
//   constructor(public name : string, public amount:number){}
// }
