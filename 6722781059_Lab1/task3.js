function getGrade(score){
    if (score >= 80){
        console.log('A');
    } else if(score >= 70){
        console.log('B');
    } else if(score >= 60){
        console.log('C');
    } else console.log('F');
}

getGrade(95);
getGrade(75);
getGrade(65);
getGrade(40);