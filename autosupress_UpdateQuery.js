<script language="javascript" runat="server">
// Author: Eliot Harper <eliot@eliot.com.au>
// Revision date: January 31, 2021

// DISCLAIMER
// While due care has been taken in the preparation of this
// supplied code example, no liability is assumed for incidental
// or consequential damages in connection with or arising out its 
// use. Example code is provided on an "as is" basis and no 
// expressed or implied warranty of any kind is made for the 
// suitability of this code for your purpose. Salesforce Marketing 
// Cloud operational procedures and programming methods may change 
// between releases and you are solely responsible for determining 
// whether this code is applicable for your intended use.

Platform.Load('Core', '1');

var prox = new Script.Util.WSProxy();

var queryStr = '';
    queryStr += 'SELECT DISTINCT';
    queryStr += '\nEmailAddress AS [Email Address]';
    queryStr += '\nFROM _Sent s';
    queryStr += '\nLEFT JOIN _Subscribers sub'; // add ENT. prefix if using in child BU
    queryStr += '\n   ON s.SubscriberKey = sub.SubscriberKey';
    queryStr += '\nLEFT JOIN _Open o';
    queryStr += '\n   ON s.SubscriberKey = o.SubscriberKey';
    queryStr += '\nWHERE o.SubscriberKey IS NULL';

  var queryDef = {
    CustomerKey: 'QUERY_ACTIVITY_EXTERNAL_KEY',
    ObjectID: 'QUERY_ACTIVITY_URL_ID',
    QueryText: queryStr,
    TargetType: 'DE',
    TargetUpdateType: 'Update',
    DataExtensionTarget: {
      CustomerKey: 'AUTO-SUPRESSION_LIST_EXTERNAL_KEY',
      Name: 'AUTO-SUPRESSION_NAME'
    }
  };
var updateQuery = prox.updateItem('QueryDefinition', queryDef);

Write('result: ' + Stringify(updateQuery))

</script>
