import $ from 'jquery'


class WyrRoute {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            const objectOfWYR = document.getElementsByClassName("wyr-frontend")
            const arrayOfWYR = Object.values(objectOfWYR)
            for (let index = 0; index <arrayOfWYR.length; index++) {
                this.firstAnswer = arrayOfWYR[index].getElementsByClassName("firstAns")[0]; 
                this.secondAnswer = arrayOfWYR[index].getElementsByClassName("secondAns")[0]; 
                this.events()         
            }
        })
    }
    events() {
        this.firstAnswer.addEventListener("click", e => this.clickHandler(e))
        this.secondAnswer.addEventListener("click", e => this.clickHandler2(e))
    }

    clickHandler(e) {
        var question_id = e.target.parentElement.parentElement.getAttribute("id")
        let numericId = Number(question_id)
        var ajax_url = ajax_object.ajax_url
        var data = {
            'action': 'anAction',
            'question_Id': numericId
        }
        $.ajax({
            type: 'GET',
            url: ajax_url,
            data: data,
            dataType: 'HTML',
            success: function (data) {
                let arrayOfData = data.split(" ");
                console.log(arrayOfData)
                let parentElement = e.target.parentElement
                let theFirstAnswer = parentElement.getElementsByTagName("div")[0]
                let theSecondAnswer = parentElement.getElementsByTagName("div")[1]
                theFirstAnswer.innerText = arrayOfData[0] + " % of people answered this"
                theSecondAnswer.innerText = arrayOfData[1] + " % of people answered this"
                
            },
            error: function (e) {
                console.log(e.statusText);
                console.log("failure")
            }
        });
    }
    clickHandler2(e) {
        var question_id = e.target.parentElement.parentElement.getAttribute("id")
        let numericId = Number(question_id)
        var ajax_url = ajax_object.ajax_url
        var data = {
            'action': 'anAction',
            'question_Id': numericId
        }
        $.ajax({
            type: 'GET',
            url: ajax_url,
            data: data,
            dataType: 'HTML',
            success: function (data) {
                console.log(data)
                var arrayOfData = data.split(" ");
                var parentElement = e.target.parentElement
                var theFirstAnswer = parentElement.getElementsByTagName("div")[0]
                var theSecondAnswer = parentElement.getElementsByTagName("div")[1]
                theFirstAnswer.innerText = arrayOfData[0] + " % of people answered this"
                theSecondAnswer.innerText = arrayOfData[1] + " % of people answered this"
            },
            error: function (e) {
                console.log(e.statusText);
                console.log("failure")
            }
        });
    }
}

new WyrRoute();




