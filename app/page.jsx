import styles from "../styles/home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <main className={styles.page}>
      <Header />
      <SideNav />
      <div className={styles.main}>
        <h1>Welcome to My Social App</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quos consequuntur, earum amet quo sed ab odio, dolore culpa
          aspernatur dignissimos odit magni eaque dicta debitis cumque, in illum accusantium? Ducimus et recusandae expedita minus in
          obcaecati vero dicta voluptatem ea cupiditate nisi eligendi quidem officiis, maiores blanditiis dolorum. Molestiae, beatae? Eum,
          facere dolor itaque ad ullam aut fugiat omnis! Commodi debitis dolores porro veritatis consectetur repellendus possimus suscipit
          minus aliquam quisquam odio ad quaerat vel quam at, ex excepturi! Nostrum libero impedit eum, obcaecati sed quas cupiditate quia
          fugiat! Voluptatem repudiandae consequuntur temporibus aut aspernatur porro numquam. Magni, corporis, porro totam at,
          exercitationem odio ad quos amet nulla commodi dolorem deserunt eum corrupti illum error. Eum consequatur nobis maxime!
          Voluptatem, ipsum! Debitis recusandae quas velit optio ipsum? Laudantium corporis doloremque commodi recusandae repellat
          architecto eligendi expedita facilis ratione eos similique dolores assumenda ipsum repellendus ab, ducimus quis ex! Voluptatibus!
          Aut laborum ducimus maxime atque inventore id itaque quos dolores quibusdam ea. Eligendi sapiente atque dignissimos deleniti odio,
          quam animi! Nesciunt doloribus ea dolore laboriosam obcaecati, rem amet eos beatae. Ut ipsum rerum qui maiores natus minus
          corrupti accusamus voluptatum asperiores temporibus magni magnam laudantium, laborum velit numquam excepturi aliquid iusto
          blanditiis. Id excepturi harum minus dignissimos, eum dolores qui. Explicabo eveniet delectus ut quo voluptas alias assumenda
          fugit! Minima distinctio officia nam facilis blanditiis accusamus facere animi mollitia, quis dolorem molestias assumenda nemo!
          Quam, quibusdam libero! Quo, placeat nam? Rem ut suscipit inventore architecto unde perferendis deleniti repellat laudantium ex
          voluptatibus molestias, optio atque accusamus ipsum excepturi quos. Amet obcaecati delectus labore dolorem? Facere incidunt
          expedita accusantium dolores. Veritatis. Aperiam, nisi? Dolores eius ducimus iste? Dolorem voluptatem rerum voluptatum sed beatae,
          quis eaque praesentium fugiat cum. Beatae fugiat soluta nostrum, accusamus voluptates illo similique odit, doloribus obcaecati
          quod aliquam! Temporibus vero iste esse quas dicta ipsa id ipsum exercitationem ad voluptate blanditiis vel officia fuga quo
          reiciendis, sunt consequatur eaque distinctio consequuntur reprehenderit odit? Voluptates iste necessitatibus sint quia. Velit
          temporibus possimus aut nisi blanditiis fuga tempore ratione culpa adipisci quos suscipit, veniam cum laborum sapiente dolorum at
          dolores nostrum est incidunt nam delectus laudantium autem tenetur? Eius, magni! Laborum officia consectetur necessitatibus!
          Possimus quam similique esse aliquid consequatur. Quo nam dicta cumque voluptatem quibusdam inventore excepturi architecto sed
          rerum commodi delectus optio debitis suscipit quasi, illo numquam perferendis. Eum omnis consequuntur iure eos, aperiam similique
          necessitatibus eaque excepturi, sit quas voluptates reprehenderit fugiat qui ullam voluptate sed ea commodi consequatur architecto
          nisi accusamus ab placeat? Error, explicabo itaque.0
        </p>
      </div>
      <Contacts />
      <Footer />
    </main>
  );
}
