async function add (){
    // const docRef = db.collection('users').doc('saeh8962');

    // await docRef.set({
    // eamil: 'saeh8962@colorado.edu',
    // password: 'My3sons2@4'
    // });
    // const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {

    var data = doc.data();
    
  console.log(doc.id, '=>', data.entries());
});
}
