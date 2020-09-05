# efood

## Git commands
### Cloning
#### In working folder 
From master
```
git clone https://github.com/Utsy-Yo/SES1B.git
```
From branch
```
git clone -b <branch_name> https://github.com/Utsy-Yo/SES1B.git
```
### Pushing changes
#### Inside project folder
```
git status
git add .
git status
git commit -m "commit message"
git push
```
if push doesn't work may need to login with:
```
git config --global user.email “your@email.com”
git config --global user.name “your.username”
```


## Project setup in SES1B folder
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).