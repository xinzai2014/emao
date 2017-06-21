ommand line instructions

Git global setup

git config --global user.name "web"
git config --global user.email "huzaixing479@emao.com"

Create a new repository

git clone git@git.emao.net:huzaixing/project-vue.git
cd project-vue
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Existing folder or Git repository

cd existing_folder
git init
git remote add origin git@git.emao.net:huzaixing/project-vue.git
git push -u origin master