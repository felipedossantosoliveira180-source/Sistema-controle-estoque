/* CONFIGURAÇÕES GERAIS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f1f4f9;
    color: #263445;
}

/* CABEÇALHO */
header {
    background-color: #17365d;
    color: white;
    padding: 25px 7%;
}

.header-content {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

header h1 {
    font-size: 26px;
    margin-bottom: 6px;
}

header p {
    color: #d5e2f3;
    font-size: 14px;
}

.system-label {
    background-color: #294d78;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 13px;
}

/* CONTEÚDO */
.container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 20px;
}

/* INDICADORES */
.dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 25px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    border-left: 5px solid #2875bd;
    box-shadow: 0 2px 8px #0000000d;
}

.card span {
    display: block;
    color: #697789;
    font-size: 14px;
    margin-bottom: 12px;
}

.card strong {
    font-size: 30px;
    color: #17365d;
}

.card.warning {
    border-left-color: #e5a323;
}

/* FORMULÁRIO */
.form-section,
.stock-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 2px 8px #0000000d;
}

h2 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #17365d;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field label {
    font-size: 14px;
    font-weight: bold;
}

input, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccd4df;
    border-radius: 6px;
    font-size: 14px;
    background: white;
}

input:focus, select:focus {
    outline: 2px solid #8bb9e8;
    border-color: #2875bd;
}

.form-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    border: none;
    padding: 11px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    background: #2875bd;
    color: white;
}

button:hover {
    opacity: 0.85;
}

.btn-secondary {
    background: #687789;
}

/* TABELA */
.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.section-heading h2 {
    margin-bottom: 0;
}

#busca {
    max-width: 280px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 750px;
}

th {
    background: #edf2f8;
    color: #17365d;
    text-align: left;
    padding: 14px 10px;
    font-size: 13px;
}

td {
    padding: 13px 10px;
    border-bottom: 1px solid #e8edf3;
    font-size: 13px;
}

.empty {
    text-align: center;
    padding: 30px;
    color: #8793a1;
}

.status {
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: bold;
    white-space: nowrap;
}

.status-ok {
    background: #d9f3e2;
    color: #19723b;
}

.status-low {
    background: #fff0cf;
    color: #946200;
}

.status-out {
    background: #fbdede;
    color: #a32d2d;
}

/* BOTÕES DA TABELA */
.actions {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

.actions button {
    padding: 7px 9px;
    font-size: 11px;
}

.btn-edit {
    background: #2875bd;
}

.btn-entry {
    background: #21864b;
}

.btn-exit {
    background: #d58a21;
}

.btn-delete {
    background: #c43c3c;
}

.footer {
    text-align: center;
    color: #8793a1;
    font-size: 12px;
    padding: 15px;
}

/* RESPONSIVIDADE */
@media (max-width: 750px) {
    .dashboard {
        grid-template-columns: 1fr;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }

    .section-heading {
        flex-direction: column;
        align-items: stretch;
    }

    #busca {
        max-width: none;
    }

    .form-section,
    .stock-section {
        padding: 18px;
    }
}
