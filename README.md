# Baze-de-date-Proiect

 * Tehnologiile folosite la dezvoltarea aplicatiei au fost:
    - pentru partea de backend:
        Spring Boot,
        PostgreSQL
    - pentru partea de frontend: 
        Angular

* Ideea principala a acestui proiect a fost creearea unei aplicatii care poate fi folosita pentru a face mai usoara gestionarea 
unei farmacii.

* Aplicatia are un sistem de autentificare, care in functie de rolul pe care il are userul, ii ofera acestuia accesul la diferite actiuni.
  - rol de admin: poate vedea toate farmaciile, impreuna cu toate informatiile legate de aceasta ( centrele, si stocul pe care il are fiecare centru), dar 
  si de a adauga alte farmacii / membrii.
  - rol de customer: are acces doar la farmacia sa.
 
 * momentan exista doar 2 conturi creeate pe parcursul dezvoltarii aplicatiei.
   - cu rol de admin: 
        username: admin@pharmacy.ro
        password: admin
    - cu rol de customer:
        username: catena@gmail.com  
        password: customer
  
  * pentru a pornii aplicatia:
    - se porneste serverul de backend
    - presupune a avea o versiune de node instalata. https://nodejs.org/en/
    - npm install -g @angular/cli 
    - se merge in folderul " frontend " si se executa comanda: ng serve --o [ --port ]
 
     

