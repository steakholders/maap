MaaP
====

Lo scopo di MaaP è quello di fornire un framework per generare interfacce web di amministrazione dei dati di business basato su stack **Node.js** e **MongoDB**. L'obiettivo è quello di semplificare il processo di implementazione di tali interfacce che lo sviluppatore, appoggiandosi alla produttività del framework MaaP, potrà generare in maniera semplice e veloce ottenendo quindi un considerevole risparmio di tempo e di sforzo. Il fruitore finale delle pagine generate sarà infine l'esperto di business che potrà visualizzare, gestire e modificare le varie entità e dati residenti in MongoDB. MaaP è l'acronimo di **MongoDB as an admin Platform**.

Utilizzo rapido
---

Di seguito vengono presentate le istruzioni per un rapido utilizzo di MaaP:

```
npm install -g maap
maap create project
cd project
npm install
vim config.js
npm start
```

Per maggiori dettagli riferirsi alla sezione [*Primo utilizzo*](https://github.com/steakholders/maap-dev/wiki/Primo-utilizzo) della wiki.

File di configurazione
---

All'interno dell'applicazione generata è possibile modificare i seguenti file di configurazione:

```
config.js
app/scripts/config.js
collections/*.dsl
```
Il primo si riferisce alla **configurazione del back-end**, il secondo alla **configurazione del front-end** e il terzo ai **file DSL** da editare. Per maggiori informazioni riferirsi alla sezione [*Configurazione nuovo progetto*](https://github.com/steakholders/maap-dev/wiki/Configurazione-nuovo-progetto) della wiki.


Popolamento del database di prova
---

Per popolare il database con le collections di prova posizionarsi all'interno della cartella `./extra/` dell'applicazione generata. Al suo interno saranno presenti diversi files JSON con i dati di prova. `populate-users-db.sh` e `populate-data-db.sh` sono degli script che popolano il database con dei dati di esempio, per utilizzarli su un database locale eseguire:

`./populate-users-db.sh --host localhost:27017 --db users`
`./populate-data-db.sh --host localhost:27017 --db data`

Per maggiori dettagli riferirsi alla sezione [*Primo utilizzo*](https://github.com/steakholders/maap-dev/wiki/Primo-utilizzo) della wiki.

Configurazione di una DSL
---

Di seguito viene riportato il codice base di configurazione di un file DSL:


```  javascript
collection(
	name: "userscollection", 
	label: "Users", 
	id: "myId", 
	weight: 1 
) {
	index( 
		perpage: 50, 
		populate: "father", 
		sortby: "username", 
		order: "asc", 
		query: { country: "Italy"}
	) {
		column(
			name: "username", 
			label: "Username", 
			sortable: true, 
			selectable: true, 
			transformation: function(val) { return "The Great " + val; }
		)
		// ...
	}
	show(
		populate: "father"
	) {
		row(
			name: "username", 
			label: "Username", 
			transformation: function(val) { return "The Great " + val; }
		)
		// ...
	}
} 

```

Per maggiori dettagli riferirsi alla sezione [*Configurazione di un file DSL*](https://github.com/steakholders/maap-dev/wiki/Configurazione-di-un-file-DSL) e [*Esempi di configurazione di un DSL*](https://github.com/steakholders/maap-dev/wiki/Esempi-di-configurazione-DSL) della wiki.