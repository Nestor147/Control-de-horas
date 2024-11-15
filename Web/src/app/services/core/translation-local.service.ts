import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { I18NResourceItem } from 'src/app/models/i18n/i18nresource-item.model';





@Injectable({
  providedIn: 'root'
})
export class TranslationLocalService  {
  public listI18NResorceResponse: I18NResourceItem[]=[]
  private readonly apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = '/api/I18NResource/';
    this.getTranslateLocalStorage()
   this.gettranslationsByRegion()
   

  }
  private region:string='es-ES';

  // private baseUrl = environment.BaseUrl; 

  getDataLocalStorageOrDataBases(){
    if(this.listI18NResorceResponse.length>1){
    this.getTranslateLocalStorage()
    }else{
    }
  }

  getTranslateLocalStorage():I18NResourceItem[] | undefined {
    const localData=localStorage.getItem("AANS_SESSION:Translation")
    if(localData!=null){
      let translatePT=JSON.parse(localData)
      const translatePtStorage=translatePT as I18NResourceItem[]
      return translatePtStorage
    }else{
      return undefined
    }
  }
  
  getDirectTranslation(defaultValue:string, grupoName: string, resourceName: string):string{
    const response= this.getTranslateLocalStorage()
    if (response !== undefined) {
      this.listI18NResorceResponse = response;
    }
    try {
      const filteredItems = this.listI18NResorceResponse.filter(item => 
        item.resourceGroup === grupoName && item.resourceName === resourceName 
      );
      if (filteredItems.length > 0) {
        return filteredItems[0].resourceValue
      } else {
        return defaultValue
      }
    } catch (e) {
     return defaultValue
    }
  }
  


  getTranslateById(region:string, id:number):Observable<I18NResourceItem>{
    const params=new HttpParams().set('region',region)
    return this.http.get<I18NResourceItem>(`${this.apiUrl}GetResourceByRegion?region=${region}`)
    .pipe(
      map((body:any)=>{
        localStorage.setItem("AANS_SESSION:Translation" ,JSON.stringify(body))
        return body;
      })
    )

  }


  getTranslate(region:string):Observable<I18NResourceItem[] >{
    const url = `${this.apiUrl}GetResourceByRegion?region=${region}`
    return this.http.get<I18NResourceItem[] >(url)
    .pipe(
      tap(region=>{
        this.listI18NResorceResponse=region
        localStorage.setItem("AANS_SESSION:Translation" ,JSON.stringify(this.listI18NResorceResponse))
      }),
    catchError(()=>of([]))
    )
  }

  gettranslationsByRegion(){
     this.getTranslate('es-ES').subscribe(
      item=>this.listI18NResorceResponse=item)
  }
}
