import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
actor Token {

    var owner: Principal = Principal.fromText("xfizg-sa3hr-zglz3-hgoxe-fqlxo-p7yw4-rqexe-rjc7h-3p6j4-f64eh-mqe");
    var totalSupply : Nat = 10000000;
    var symbol: Text = "IKKIN";

    stable var balanceEntries:[(Principal,Nat)] = [];
    var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);


    public query func balanceOf(who: Principal): async Nat {

        let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
        };
        return balance;
    };

    public query func getSymbol():async Text{
       return symbol;
    };

    public shared(msg) func payOut():async Text{
        //Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
           let amount = 1000;
           let result = await transfer(msg.caller,amount);
           return "Success";
        }
        else
        {
            return "Sorry Already Used";
        }
        
    };

    public shared(msg) func transfer(to:Principal,amount:Nat):async Text{
     let balanceFrom = await balanceOf(msg.caller);
     if(balanceFrom > amount){
         let newBalance:Nat =  balanceFrom - amount;
         balances.put(msg.caller,newBalance);

         let balanceTo = await balanceOf(to);
         let newBalanceTo = balanceTo + amount;
         balances.put(to,newBalanceTo);
         return "Successful";
     }
     else
     {
        return "Unsuccessful!! Insufficient funds";
     }
    };

     system func preupgrade(){
          balanceEntries := Iter.toArray(balances.entries());
     };
     
     system func postupgrade(){
         balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
         if(balances.size() < 1)
         {
            balances.put(owner,totalSupply);
         }
         
    }
 }
