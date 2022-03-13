import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef,
    GridApi,
    ColumnApi,
    GridReadyEvent,
    Module } from 'ag-grid-community';
import { CustomerService } from "src/app/core/services/customer.service";
import { Customer } from './core/models/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const EMPTY_Customer: Customer = {
    id: 0,
    customerName: '',
   
    class: '',
    phone: '',
    email: '',
    comment: '', 

  };
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})



export class AppComponent {
  saveDisabled = false;
  updateDisabled = false;
    private gridApi!: GridApi;
    private columnApi!: ColumnApi;
    customer: Customer;
    formGroup: FormGroup;
    columnDefs: ColDef[] = [
        { field: 'id', sortable: true },
        { field: 'customerName', sortable: true },
        { field: 'class', sortable: true },
        { field: 'phone', sortable: true},
        { field: 'email', sortable: true},
        { field: 'comment', sortable: true}
    ];
    
    rowData:Observable<any>;
    public rowSelection = 'single';
   // public rowData!: any[];
    constructor(private http: HttpClient, private customerService: CustomerService,private fb: FormBuilder) {
this.customer=new Customer();
this.formGroup = this.fb.group({
    customername: [this.customer.customerName],
     
    class: [this.customer.class],
   phone: [this.customer.phone],
   email: [this.customer.email],
   comment: [this.customer.comment],
   
   
  });
        //this.rowData = this.http.get<any[]>('https://localhost:44397/api/Customer/GetAll');
     //  this. rowData=  [];
    debugger;
     this.updateDisabled = true;
     this.rowData = this.customerService.getCustomers();
     this.loadcustomer();
    }
   

    loadcustomer()
    {

        this.formGroup = this.fb.group({
            customername: [this.customer.customerName, Validators.compose([Validators.required])],
             
            class: [this.customer.class, Validators.compose([Validators.required])],
           phone: [this.customer.phone, Validators.compose([Validators.required])],
           email: [this.customer.email, Validators.compose([Validators.required])],
           comment: [this.customer.comment],
           
           
          });
          this.saveDisabled = true;
          this.updateDisabled = false;
    }

    save() {
        debugger;
       this.customer = new Customer();
       this.prepareCustomer();
       console.log(this.customer);
      this.addcustomer(this.customer);
      this.saveDisabled = true;
     }

     addcustomer(customer:Customer)
     {

        this.customerService.SaveCustomer(customer).toPromise().then
        (Result=>{
          debugger;
           if(Result==true){
             this.rowData = this.customerService.getCustomers();;
           
             }
             
      })
     }
     private prepareCustomer() {

        debugger;
       
       const formData = this.formGroup.value;
       this.customer.customerName = formData.customername;
       this.customer.class = formData.class;
       this.customer.phone =String(formData.phone);
       this.customer.email = formData.email;
       this.customer.comment = formData.comment;
     }


     clear()
     {
     this.customer=new Customer();
      this.loadcustomer();
      this.saveDisabled = false;
  this.updateDisabled = true;

     }

     controlHasError(validation:string, controlName:string): boolean {
       debugger;
        const control = this.formGroup.controls[controlName];
      
        if(control.hasError(validation) ||(control.hasError(validation) && (control.dirty || control.touched)))
        {
          this.saveDisabled=true;
          this.updateDisabled = true;

        }
        else{
          this.saveDisabled=false;
         
        }
        return control.hasError(validation) && (control.dirty || control.touched);
      }
      
      onSelectionChanged() {
          debugger;
        const selectedRows = this.gridApi.getSelectedRows();
        console.log(selectedRows);
        if(selectedRows!=null)
        {

            this.customer=selectedRows[0];
        this.loadcustomer();
        }
      }

      onGridReady(params: GridReadyEvent) {
         debugger;
        this.gridApi = params.api;
        this.columnApi=params.columnApi;

        
    
        
      }

    update ()
      {
          debugger;
    if (this.customer.id!=0) {
       this.prepareCustomer();
     this.addcustomer(this.customer);

      }
    }

      delete()
      {
        debugger;
        if (this.customer.id!=0) {
            
            this.customerService.DeleteCustomer(this.customer.id).toPromise().then
            (Result=>{
              debugger;
               if(Result==true){
                this.rowData = this.customerService.getCustomers();
               this.clear();
                 }
                 
          })
           }
           

           

      }

     printSortStateToConsole()
     {
       debugger;
      const sortState = this.columnApi.getColumnState().map(column => column.sort);
      const columns = this.columnDefs
   
      sortState.forEach(function (sort, index) {
       if(sortState[index]=='asc')
       {
        columns[index].headerName=columns[index].field + ' A-Z';


       }
       else if(sortState[index]=='desc')
       {
        columns[index].headerName=columns[index].field + ' Z-A';


       }
       else{

        columns[index].headerName = columns[index].field
       }
      });
      
      
      this.gridApi.setColumnDefs(columns)
     }
    }

