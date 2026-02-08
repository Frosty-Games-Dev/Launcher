const status3 = document.getElementById('news-container');
const status4 = document.getElementById('news-box-id');

document.getElementById('icon-minimize-id').addEventListener('click', () => {
    window.electronAPI.minimizeWin();
});

document.getElementById('icon-close-id').addEventListener('click', () => {
    window.electronAPI.closeWin();
});

function closeBoxNews() {
    status3.style.display = 'block';
    status4.style.display = 'none';
    window.electronAPI.reloadWin();
}

/*

Pour le moment j'utilise un système de news avec l'extension "Live Server" qui me permet de créer un serveur en local.

Le fichier news.json doit être situé dans un autre dossier avec le nom "news" (pour créer un serveur externe non lié avec ce dossier).

Voici un exemple de code à mettre dans le fichier news.json :

[
  {
    "id": 1,
    "title": "[Communautée] Rappel de la politique de fair-play : bannissement des tricheurs",
    "content": "Comme précisé dans le règlement, le fait d'utiliser toutes formes de triche pour avoir un avantage divers est <strong>strictement interdit !</strong><br><br>Toute triche est punie d'une sanction allant d'une simple expulsion avec un avertissement, mais cela peut aller jusqu'au <strong>banissement temporaire</strong> voire <strong>définitif</strong>.<br><br>En 2024, environ : <strong>19K personnes</strong> ont reçu un avertissement, <strong>8K</strong> ont été bannies de façon temporaire et <strong>2K</strong> ont été bannies de façon permanente.<br><br>Cette année, l'équipe de modération a décrit avoir vu <strong>une baisse de 17%</strong> dans le domaine de la triche.<br><br>Pour tout renseignement et tout report de joueurs, rendez-vous dans la partie support de notre serveur Discord '<strong>Nyka Studio</strong>' ou sur notre site web '<strong>nyka.fr</strong>'<br><br><br><strong>Merci à vous d'avoir lu ce message.</strong>",
    "publish_date": "...",
    "author": "..."
  },
  {
    "id": 2,
    "title": "[Mise à Jour] Changement dans le lobby : Le Marché Interdit prend de l'ampleur",
    "content": "",
    "publish_date": "...",
    "author": "..."
  }
]

*/

window.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('news-container');
    const container2 = document.getElementById('news-box-id');

    try {
        const res = await fetch('http://localhost:5500/news/news.json'); // Sur le port "5500"
        const newsList = await res.json();

        container.innerHTML = '';

        newsList.forEach(news => {
            const div = document.createElement('div');
            div.className = `news news-item-${news.id}`;
            div.innerHTML = `
                <p class="news-title">${news.title}</p>
                <p class="news-publish_date">${news.publish_date}</p>
                <p class="news-separation"></p>
            `;
            container.appendChild(div);
            div.addEventListener('click', () => {
                container2.innerHTML = '';
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                div1.innerHTML = `
                    <button class="btn-news-box" onclick="closeBoxNews()"></button>
                `;
                div2.className = 'news-box-2';
                div2.innerHTML = `
                    <p class="news-box-title">${news.title}</p>
                    <p class="news-box-content">${news.content}</p>
                    <p class="news-box-date">${news.publish_date}</p>
                    <p class="news-box-author">${news.author}</p>
                `;
                container2.appendChild(div2);
                container2.appendChild(div1);
                status3.style.display = 'none';
                status4.style.display = 'block';
            });
        });
    } catch (e) {
        console.error("Erreur lors de la récupération des news :", e);
        container.innerHTML = "<p>Impossible de charger les news.</p>";
    }
});