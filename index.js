class GHWidget {
    constructor(container) {
        this.container = container;
    }

    handleSearch(e) {
        const input = this.container.querySelector(".username");

        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Request failed");
                    throw "Response is not OK";
                }
            })
            .then(json => {
                this.handleSearchResults(json);
            })
            .catch(err => {
                console.warn(err);
                alert("Error!");
            })
    }

    handleSearchResults(repositories) {
        const oldResults = this.container.querySelectorAll(".result");
        oldResults.forEach(r => r.remove());

        repositories.forEach(repo => {
            const element = document.createElement("div");
            element.classList.add("result");
            element.style.border = "1px solid #eee";
            element.style.margin = "2px";
            element.style.padding = "1em";
            element.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
            this.container.appendChild(element);
        });
    }

    init() {
        const input = document.createElement("input");
        input.classList.add("username");
        input.setAttribute("type", "text");
        this.container.appendChild(input);

        const button = document.createElement("button");
        button.classList.add("search");
        button.innerText = "Submit";
        button.addEventListener("click", (e) => { this.handleSearch(e); });
        this.container.appendChild(button);
    }
}

const widget = new GHWidget(document.querySelector(".mainContainer"))
widget.init();

const container = document.createElement("div");
document.body.appendChild(container);
new GHWidget(container).init();
