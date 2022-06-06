import Item from './items/Item';

const Dashboard = () => {
    return (<div>

        <Item text = "Nombre de points d'échanges" data = "data1"/>
        <Item text = "Nombre de bus moyen par lignes" data = "data2"/>
        <Item text = "Population couverte" data = "data3"/>
        <Item text = "Nombre de conducteur" data = "data4"/>
        <Item text = "Nombre de retards moyen par ligne" data = "data5"/>
        </div>);
};

export default Dashboard;
