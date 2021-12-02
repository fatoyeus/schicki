



function createStore  (bucketName){

const {Storage}			=		require('@google-cloud/storage');




const projectId	= "schickiapp";
const keyFilename = "APIs/schicki_storage/schickiapp-9c103e58a0da.json";

const storage = new Storage({projectId, keyFilename});

const bucket = storage.bucket(bucketName);

const createStore = bucket.create(function(err, bucket, apiResponse) {
																  if (!err) {
																	// The bucket was created successfully. 
																	  console.log(bucket);
																	  console.log(apiResponse);
																  }
																});

 
}

 module.exports = createStore;
 
