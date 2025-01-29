import { useState } from "react";
import styles from "../styles/footer.module.css";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer} onClick={() => setIsModalOpen(true)}>
        <p>Terms & Conditions</p>
        <p>Matteus888 © 2025</p>
      </footer>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalTitle}>Terms & Conditions</p>
            <div className={styles.modalContent}>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus fuga cumque at repellat dolore aut rerum nam, quaerat minus
                nulla repudiandae quas, voluptatum inventore voluptate placeat fugit accusantium ullam accusamus! Sapiente expedita natus
                laudantium! Soluta, dolorem? Eos sint alias perferendis doloremque, optio molestias, nisi soluta quam consequuntur dolorum
                sunt officia, officiis deserunt. Provident, voluptas voluptate eum minima perspiciatis et possimus!
              </p>
              <br />
              <p>
                Exercitationem dolor aperiam nihil voluptatibus dolorum quaerat laboriosam doloribus explicabo illum eligendi facilis fugit,
                earum autem officia quibusdam! Dolor obcaecati odio nostrum alias. Animi maxime sapiente sequi deserunt aperiam error! Modi
                optio repellendus accusamus sunt odit quos magni numquam quod hic, harum recusandae doloribus illum inventore enim atque
                porro aliquid, sed consectetur quia eveniet aperiam non adipisci tenetur dicta. Beatae? Ratione possimus totam rerum
                reiciendis optio qui obcaecati.
              </p>
              <br />
              <p>
                Impedit placeat nam numquam quisquam sed, dolor minus temporibus totam repudiandae rem modi ducimus illum unde vitae
                explicabo, tenetur officiis vero iste. Iure soluta nobis unde libero possimus distinctio tempore animi sequi ratione ipsam
                nisi magni minus quos exercitationem rerum fugit obcaecati, nostrum et placeat consequatur, tenetur excepturi voluptatibus?
                Voluptas, eligendi at. Esse modi aliquam saepe sit, delectus architecto necessitatibus iste similique totam possimus cumque
                cupiditate quaerat impedit molestiae explicabo. Ipsa animi architecto repellendus sint fugiat est aliquid incidunt
                praesentium ullam vitae?
              </p>
              <br />
              <p>
                Necessitatibus doloribus quibusdam repudiandae asperiores quod dolorum vel placeat fugiat alias provident illo impedit optio
                possimus aperiam ea esse eius pariatur iste adipisci cupiditate voluptatibus corrupti, ratione enim. Laudantium, rem. Libero
                quod sequi odit, animi sint minima repellendus asperiores vel laborum, vitae, veniam ipsam voluptates nostrum impedit
                officia maxime? Nihil atque repellat hic facere cumque assumenda enim natus eaque earum! Et nemo quibusdam quo non sapiente
                pariatur eaque. Quasi quo doloribus maxime possimus laboriosam voluptatibus, laudantium adipisci at sunt! Ipsam quos
                accusantium non fugit ad facere nobis consequatur magni animi?
              </p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setIsModalOpen(false)} className={`${styles.btn} ${styles.okBtn}`}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
