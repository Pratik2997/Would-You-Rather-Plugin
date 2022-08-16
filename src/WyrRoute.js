import $ from 'jquery'


class WyrRoute {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            if (document.body.classList.contains("logged-in")) {
                const objectOfWYR = document.getElementsByClassName("wyr-frontend")
                const arrayOfWYR = Object.values(objectOfWYR)
                for (let index = 0; index < arrayOfWYR.length; index++) {
                    this.firstAnswer = arrayOfWYR[index].getElementsByClassName("firstAns")[0];
                    this.secondAnswer = arrayOfWYR[index].getElementsByClassName("secondAns")[0];
                    this.events()
                }
            }
        })
    }
    events() {
        this.firstAnswer.addEventListener("click", e => this.clickHandler(e))
        this.secondAnswer.addEventListener("click", e => this.clickHandler2(e))
    }

    clickHandler(e) {
        let question_id = e.target.parentElement.parentElement.getAttribute("id")
        let numericId = Number(question_id)
        let ajax_url = my_ajax_object.ajax_url
        let data = {
            'action': 'my_action',
            'question_id': numericId,
            'answer1clicks': '1',
            'answer2clicks': '0'
        }
        $.ajax({
            type: 'POST',
            url: ajax_url,
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log(data)
            },
            error: function (e) {
                console.log(e.statusText);
                console.log("failure")
            }
        });
    }
    clickHandler2(e) {
        let question_id = e.target.parentElement.parentElement.getAttribute("id")
        let numericId = Number(question_id)
        let ajax_url = my_ajax_object.ajax_url
        let data = {
            'action': 'my_action',
            'question_id': numericId,
            'answer1clicks': '0',
            'answer2clicks': '1'
        }
        $.ajax({
            type: 'POST',
            url: ajax_url,
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log(data)
            },
            error: function (e) {
                console.log(e.statusText);
                console.log("failure")
            }
        });
    }
}

new WyrRoute();




