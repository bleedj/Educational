// ex1
const concat = (row1: string, row2: string): string => { return row1 + ' ' + row2 }
const myRow = concat('Hello', 'World')

// ex2
const MyHometask: IHomeTaskEx2 = {
    howIDoIt: "I Do It Wel",
    simeArray: ["string one", "string two", 42],
    withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
}

interface IHomeTaskEx2 {
    howIDoIt: string;
    simeArray: (string | number)[];
    withData: Array<object>
}


// ex3
const myArray: IMyArray<number> = [1,2,3,4];

interface IMyArray<T> {
    [N: number]: T;
    reduce(fn: (accumulator:T, value:T) => T, initialValue?: T): T
        
    
}
const var1 = myArray.reduce((a,b) => a+b)


// ex4
interface IHomeTask {
    data: string;
    numbericData: number;
    date: Date;
    externalData: {
        basis: number;
        value: string;
    }
}

const homeTask: MyPartial<IHomeTask> = {
    externalData: {
        value: 'win'
    }
}

type MyPartial<T> = {
    [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N] 
}